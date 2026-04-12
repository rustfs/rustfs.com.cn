export interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  prerelease: boolean;
  draft: boolean;
  assets: {
    name: string;
    browser_download_url: string;
    size: number;
  }[];
}

export interface GitHubMetrics {
  stars: number;
  forks: number;
  commits: number;
}

const GITHUB_API_REVALIDATE_SECONDS = 3600;
const GITHUB_USER_AGENT = 'RustFS-Website';
const GITHUB_API_VERSION = '2022-11-28';
const LAST_KNOWN_GITHUB_METRICS: GitHubMetrics = {
  stars: 24734,
  forks: 1064,
  commits: 2720,
};

function getGitHubHeaders(
  accept: string = 'application/vnd.github+json',
  extraHeaders: Record<string, string> = {}
): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: accept,
    'User-Agent': GITHUB_USER_AGENT,
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
    ...extraHeaders,
  };
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function parseCommitCount(linkHeader: string | null): number | null {
  const match = linkHeader?.match(/page=(\d+)>; rel="last"/);
  if (!match?.[1]) {
    return null;
  }

  const page = Number(match[1]);
  return Number.isFinite(page) && page > 0 ? page : null;
}

async function getGitHubMetricsFromGraphQL(): Promise<GitHubMetrics | null> {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;

  if (!token) {
    return null;
  }

  const query = `
    query RepositoryMetrics($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        stargazerCount
        forkCount
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 1) {
                totalCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: getGitHubHeaders('application/json', {
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      query,
      variables: {
        owner: 'rustfs',
        name: 'rustfs',
      },
    }),
    next: { revalidate: GITHUB_API_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    console.warn(`Failed to fetch GitHub metrics via GraphQL: ${response.status} ${response.statusText}`);
    return null;
  }

  const payload = await response.json() as {
    data?: {
      repository?: {
        stargazerCount?: number;
        forkCount?: number;
        defaultBranchRef?: {
          target?: {
            history?: {
              totalCount?: number;
            };
          };
        };
      };
    };
    errors?: Array<{ message?: string }>;
  };

  if (payload.errors?.length) {
    console.warn(`GitHub GraphQL returned errors: ${payload.errors.map((error) => error.message).filter(Boolean).join('; ')}`);
    return null;
  }

  const repository = payload.data?.repository;
  const commits = repository?.defaultBranchRef?.target?.history?.totalCount;

  if (
    typeof repository?.stargazerCount !== 'number' ||
    typeof repository?.forkCount !== 'number' ||
    typeof commits !== 'number'
  ) {
    console.warn('GitHub GraphQL metrics response is missing expected fields');
    return null;
  }

  return {
    stars: repository.stargazerCount,
    forks: repository.forkCount,
    commits,
  };
}

async function getGitHubMetricsFromRest(): Promise<GitHubMetrics | null> {
  const [repoRes, commitsRes] = await Promise.all([
    fetch('https://api.github.com/repos/rustfs/rustfs', {
      headers: getGitHubHeaders(),
      next: { revalidate: GITHUB_API_REVALIDATE_SECONDS },
    }),
    fetch('https://api.github.com/repos/rustfs/rustfs/commits?per_page=1', {
      headers: getGitHubHeaders(),
      next: { revalidate: GITHUB_API_REVALIDATE_SECONDS },
    }),
  ]);

  if (!repoRes.ok || !commitsRes.ok) {
    console.warn(
      `Failed to fetch GitHub metrics via REST: repo=${repoRes.status} ${repoRes.statusText}, commits=${commitsRes.status} ${commitsRes.statusText}`
    );
    return null;
  }

  const repo = await repoRes.json() as { stargazers_count?: number; forks_count?: number };
  const commitsFromHeader = parseCommitCount(commitsRes.headers.get('link'));
  let commits = commitsFromHeader ?? 0;

  if (!commitsFromHeader) {
    const data = await commitsRes.json();
    commits = Array.isArray(data) ? data.length : 0;
  }

  if (
    typeof repo.stargazers_count !== 'number' ||
    typeof repo.forks_count !== 'number' ||
    !Number.isFinite(commits) ||
    commits <= 0
  ) {
    console.warn('GitHub REST metrics response is missing expected fields');
    return null;
  }

  return {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    commits,
  };
}

/**
 * Get the latest release information (including pre-releases)
 * @returns Promise<GitHubRelease | null>
 */
export async function getLatestRelease(): Promise<GitHubRelease | null> {
  // Try to get the latest official release first
  try {
    const response = await fetch(
      'https://api.github.com/repos/rustfs/rustfs/releases/latest',
      {
        headers: getGitHubHeaders(),
        // Cache for 1 hour
        next: { revalidate: GITHUB_API_REVALIDATE_SECONDS }
      }
    )

    if (response.ok) {
      const release = await response.json()
      return release
    }
  } catch (error) {
    console.warn('Failed to fetch latest release:', error)
  }

  // If official release doesn't exist (404), get the latest version with assets
  try {
    const response = await fetch(
      'https://api.github.com/repos/rustfs/rustfs/releases?per_page=10',
      {
        headers: getGitHubHeaders(),
        // Cache for 1 hour
        next: { revalidate: GITHUB_API_REVALIDATE_SECONDS }
      }
    )

    if (response.ok) {
      const releases = await response.json()

      // Prioritize latest non-draft version with assets
      const releaseWithAssets = releases.find((release: GitHubRelease) =>
        !release.draft && release.assets && release.assets.length > 0
      )

      if (releaseWithAssets) {
        return releaseWithAssets
      }

      // If no version with assets found, return latest non-draft version
      const latestNonDraft = releases.find((release: GitHubRelease) => !release.draft)
      return latestNonDraft || null
    }
  } catch (error) {
    console.error('Failed to fetch releases:', error)
  }

  return null
}

/**
 * Get GitHub repository metrics (stars, forks, commits) at build time
 * @returns Promise<GitHubMetrics>
 */
export async function getGitHubMetrics(): Promise<GitHubMetrics> {
  try {
    const exactMetrics = await getGitHubMetricsFromGraphQL();
    if (exactMetrics) {
      return exactMetrics;
    }

    const restMetrics = await getGitHubMetricsFromRest();
    if (restMetrics) {
      return restMetrics;
    }

    console.warn('Falling back to last known GitHub metrics');
    return LAST_KNOWN_GITHUB_METRICS;
  } catch (error) {
    console.warn('Failed to fetch GitHub metrics:', error);
    return LAST_KNOWN_GITHUB_METRICS;
  }
}

/**
 * Format version number
 * @param version Version string
 * @returns Formatted version number
 */
export function formatVersion(version: string): string {
  // Remove 'v' prefix if present
  const cleanVersion = version.startsWith('v') ? version.slice(1) : version

  // Ensure version format is correct
  const versionMatch = cleanVersion.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/)
  if (!versionMatch) {
    return version;
  }

  return `v${cleanVersion}`;
}

/**
 * Format release date
 * @param dateString ISO date string
 * @param locale Language locale, default to Chinese
 * @returns Formatted date
 */
export function formatReleaseDate(dateString: string, locale: string = 'zh-CN'): string {
  try {
    const date = new Date(dateString);

    // Select appropriate format based on language locale
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return formatter.format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Get latest version string at build time
 * @returns Promise<string> Version string (e.g., "v1.0.0") or fallback
 */
export async function getLatestVersion(): Promise<string> {
  const fallback = 'v1.0.0';

  try {
    const release = await getLatestRelease();
    if (release && release.tag_name) {
      return release.tag_name.startsWith('v') ? release.tag_name : `v${release.tag_name}`;
    }
  } catch (error) {
    console.warn('Failed to fetch latest version:', error);
  }

  return fallback;
}

/**
 * Get the latest launcher release information
 * @returns Promise<GitHubRelease | null>
 */
export async function getLatestLauncherRelease(): Promise<GitHubRelease | null> {
  // Try to get the latest official release first
  try {
    const response = await fetch(
      'https://api.github.com/repos/rustfs/launcher/releases/latest',
      {
        headers: getGitHubHeaders(),
        // Cache for 1 hour
        next: { revalidate: GITHUB_API_REVALIDATE_SECONDS }
      }
    )

    if (response.ok) {
      const release = await response.json()
      return release
    }
  } catch (error) {
    console.warn('Failed to fetch latest launcher release:', error)
  }

  // If official release doesn't exist (404), get the latest version with assets
  try {
    const response = await fetch(
      'https://api.github.com/repos/rustfs/launcher/releases?per_page=10',
      {
        headers: getGitHubHeaders(),
        // Cache for 1 hour
        next: { revalidate: GITHUB_API_REVALIDATE_SECONDS }
      }
    )

    if (response.ok) {
      const releases = await response.json()

      // Prioritize latest non-draft version with assets
      const releaseWithAssets = releases.find((release: GitHubRelease) =>
        !release.draft && release.assets && release.assets.length > 0
      )

      if (releaseWithAssets) {
        return releaseWithAssets
      }

      // If no version with assets found, return latest non-draft version
      const latestNonDraft = releases.find((release: GitHubRelease) => !release.draft)
      return latestNonDraft || null
    }
  } catch (error) {
    console.error('Failed to fetch launcher releases:', error)
  }

  return null
}

/**
 * Get download link for a version
 * @param release GitHub release information
 * @param platform Platform identifier
 * @param arch Optional architecture (e.g., 'x86_64', 'aarch64')
 * @returns Download link or null
 */
export function getDownloadUrlForPlatform(
  release: GitHubRelease,
  platform: string,
  arch?: string
): string | null {
  if (!release.assets || release.assets.length === 0) {
    return null;
  }

  // Match filename pattern based on platform and architecture
  const platformPatterns: Record<string, RegExp[]> = {
    windows: [
      /rustfs-windows-x86_64.*\.exe/i,
      /windows.*x86_64.*\.exe/i,
      /windows/i
    ],
    linux: arch === 'aarch64'
      ? [
        /rustfs-linux-aarch64.*\.zip/i,
        /linux.*aarch64.*\.zip/i,
        /linux.*arm64.*\.zip/i
      ]
      : [
        /rustfs-linux-x86_64.*\.zip/i,
        /linux.*x86_64.*\.zip/i,
        /linux/i
      ],
    macos: arch === 'aarch64' || arch === 'arm64'
      ? [
        /rustfs-macos-aarch64.*\.zip/i,
        /macos.*aarch64.*\.zip/i,
        /macos.*arm64.*\.zip/i,
        /darwin.*aarch64/i
      ]
      : [
        /rustfs-macos-x86_64.*\.zip/i,
        /macos.*x86_64.*\.zip/i,
        /darwin.*x86_64/i,
        /darwin/i
      ],
    docker: [/docker/i]
  };

  const patterns = platformPatterns[platform];
  if (!patterns) {
    return null;
  }

  // Try patterns in order of specificity
  for (const pattern of patterns) {
    for (const asset of release.assets) {
      if (pattern.test(asset.name)) {
        return asset.browser_download_url;
      }
    }
  }

  return null;
}
