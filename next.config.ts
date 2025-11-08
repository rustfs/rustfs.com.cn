import type { NextConfig } from "next";
import { SITE_CONFIG } from "./app.config";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/en",
        destination: SITE_CONFIG.secondaryDomain,
        permanent: true,
      },
      {
        source: "/en/",
        destination: SITE_CONFIG.secondaryDomain,
        permanent: true,
      },
      {
        source: "/zh",
        destination: '/',
        permanent: true,
      },
      {
        source: "/zh/",
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
