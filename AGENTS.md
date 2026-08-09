# AGENTS.md - AI Agent Development Guidelines

This document provides development guidelines and rules for AI Agents to ensure code quality and smooth CI/CD pipeline execution.

## 📋 Project Overview

- **Project Name**: RustFS.com - Official Website
- **Framework**: Next.js 16.2.11 (App Router, Static Export)
- **Language**: TypeScript (ES2025+, Strict Mode)
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **CI/CD**: GitHub Actions → Aliyun OSS

## 🚨 Core Rules

### ⚠️ Pre-Commit Checklist

**Before every code commit, ensure ALL of the following checks pass:**

1. **✅ TypeScript Type Checking**

   ```bash
   # Ensure no TypeScript errors
   npx tsc --noEmit
   ```

2. **✅ ESLint Code Checking**

   ```bash
   pnpm run lint
   ```

3. **✅ Local Build Test**

   ```bash
   # Clean previous builds
   rm -rf .next out

   # Execute build
   pnpm run build

   # Ensure build succeeds without errors
   ```

4. **✅ Dependency Lock File Synchronization**
   - If using `pnpm install` to update dependencies, ensure `pnpm-lock.yaml` is updated

5. **✅ Build Artifact Verification**
   - Ensure `out/` directory is generated
   - Ensure `out/sitemap.xml` is generated (automatically by postbuild script)
   - Check build artifacts are complete

## 🔄 CI/CD Pipeline Overview

### GitHub Actions Workflow Steps

According to `.github/workflows/deploy.yml`, the CI process includes:

1. **Checkout**: Check out code

2. **Install pnpm**:

3. **Use Node.js**:

4. **Install dependencies and build**:

   ```bash
   pnpm install --no-frozen-lockfile
   pnpm run build
   ```

5. **Deploy**: Deploy to Aliyun OSS

### Local CI Simulation

Before committing, it's recommended to simulate the complete CI process locally:

```bash
# 1. Clean environment
rm -rf node_modules .next out

# 2. Install dependencies (using pnpm, consistent with CI)
pnpm install

# 3. Build project
pnpm run build

# 4. Verify build artifacts
ls -la out/
ls -la out/sitemap.xml

# 5. Run lint
pnpm run lint
```

## 📝 Development Standards

### Code Style

- ✅ Use TypeScript strict mode
- ✅ Follow ESLint configuration rules
- ✅ Use functional components and Hooks
- ✅ Use Tailwind CSS for styling
- ✅ Client components must be marked with `'use client'`

### Component Development

- ✅ Use `cn()` function to merge class names
- ✅ Support dark mode and responsive design
- ✅ Follow shadcn/ui component standards
- ✅ Maintain single responsibility principle

### Chinese Site Localization Rules

- `rustfs.com.cn` is Simplified Chinese by default. Keep page copy, metadata, `html lang`, Open Graph locale, domains, documentation links, and `hreflang` aligned with the Chinese site.
- Keep the Chinese implementation structurally aligned with the latest English site unless a rule below requires a difference. Source: https://github.com/rustfs/backlog/issues/1785.
- Preserve the existing Baidu site verification and Baidu Analytics integration.
- Use these fixed translations:
  - Multiple Protocol Access → 多协议支持
    - Flexibility & Simplicity → 便捷易用
    - Native support → 原生支持
    - Built for any workload → 灵活适配
    - Seamless integration → 无缝集成
  - High Availability & Scale → 高可用 & 扩展性
    - Reliability & Efficiency → 高效可靠
    - Enterprise Solution → 企业架构
    - Cost saving → 降低成本
    - High Flexibility → 高度灵活
  - Enterprise Security & Compliance → 安全合规
    - Secure by Default → 安全优先
    - Zero-Trust → 零信任
    - Defense in depth → 纵深防御
    - Out-of-the-Box → 开箱即用
  - Operational & Observability → 运维 & 可观测性
    - Enterprise insights → 企业洞察
    - Real-time insights → 实时监控
    - Operational flexibility → 高效运维
    - Simplified administration → 简化管理
  - Data Management → 数据管理
    - Resilience & Durability → 安全可靠
    - S3 compatibility → S3 兼容
    - Unified management → 统一管理
    - Cost efficiency → 高性价比
- Contact forms use 姓名 for First Name, 公司职位 for Last Name, 公司邮箱 for Business Email, 联系电话 for Business Phone, and 省份 for Country. The province field must list all Chinese provinces, autonomous regions, municipalities, and special administrative regions.
- Remove X/Twitter from the header and footer. Remove Discord from the footer.
- Remove Cookie Settings and Cookie Policy from the footer. Do not mount or retain any cookie/privacy consent popup on the Chinese site.
- The About page must show 北京市海淀区西小口路 66 号中关村东升科技园北领地 C 区 and phone number 400-033-5363.
- Preserve the existing rustfs.com.cn ICP and public-security registration details and links.

### Language and Locale Rules

- ✅ `rustfs.com.cn` is the Chinese-primary site. Chinese pages must default to Simplified Chinese for headings, body copy, buttons, helper text, metadata, and SEO fields.
- ✅ Keep `html lang`, page metadata locale, and `hreflang` mappings aligned with the actual site domain: `rustfs.com.cn` for Chinese and `rustfs.com` for English.
- ✅ Prefer `docs.rustfs.com.cn` when linking to Chinese documentation from the Chinese site.
- ❌ Do not leave placeholder English copy on Chinese pages such as hero titles, help text, CTA labels, date labels, or install guidance.
- ❌ Do not swap Chinese and English alternate domains or language tags.

### Style and Structure Protection

**🚨 Absolute Rule: Do NOT modify styles or structure unless explicitly specified!**

- ❌ **Forbidden** to modify existing CSS classes, layout structure, or component design
- ❌ **Forbidden** to simplify complex components or remove visual elements
- ❌ **Forbidden** to replace custom components with basic UI components
- ❌ **Forbidden** to modify animations, transitions, or interactive behaviors
- ❌ **Forbidden** to change responsive design or dark mode implementations

### Git Commit Standards

- ✅ Use [Conventional Commits](https://www.conventionalcommits.org/) specification
- ✅ Commit messages must be in English
- ✅ Format: `<type>[optional scope]: <description>`
- ✅ Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

Examples:

```bash
feat: add contact form with hCaptcha
fix: correct button alignment on mobile
docs: update README with new features
```

## 🛠️ Common Issues Troubleshooting

### Issue 1: CI Build Failure - Dependency Installation Error

**Symptoms**: `Install dependencies` step fails

**Causes**:

- `pnpm-lock.yaml` out of sync with `package.json`

**Solution**:

```bash
# Reinstall dependencies with pnpm to update lock file
pnpm install

# Commit updated pnpm-lock.yaml
git add pnpm-lock.yaml
git commit -m "fix: update pnpm-lock.yaml"
```

### Issue 2: CI Build Failure - TypeScript Errors

**Symptoms**: TypeScript type errors during build

**Solution**:

```bash
# Check TypeScript errors locally
npx tsc --noEmit

# Fix all type errors before committing
```

### Issue 3: CI Build Failure - ESLint Errors

**Symptoms**: Lint check fails

**Solution**:

```bash
# Run lint check locally
pnpm run lint

# Fix all lint errors before committing
```

### Issue 4: Build Succeeds but Deployment Fails

**Symptoms**: Build passes but deployment step fails

**Checklist**:

- Ensure `out/` directory exists
- Ensure `out/sitemap.xml` is generated
- Check build artifacts are complete

## 📚 Related Resources

- [Project README](./README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ESLint Documentation](https://eslint.org/docs/latest)

## ✅ Pre-Commit Checklist

Before every code commit, confirm:

- [ ] TypeScript type check passes (`npx tsc --noEmit`)
- [ ] ESLint check passes (`pnpm run lint`)
- [ ] Local build succeeds (`pnpm run build`)
- [ ] `pnpm-lock.yaml` is updated (if dependencies were modified)
- [ ] Build artifacts `out/` directory exists and is complete
- [ ] `out/sitemap.xml` is generated
- [ ] Commit message follows Conventional Commits specification
- [ ] Commit message is in English
- [ ] Chinese pages do not contain accidental English UI or SEO metadata
- [ ] `lang`, `openGraph.locale`, and `hreflang` match the actual page language and domain

**Remember: If local build fails, CI will also fail. Do NOT commit code that cannot pass local build!**

---

**Last Updated**: 2026-01-06
