const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['shared', 'ui', 'tailwind-config'],
  serverRuntimeConfig: {
    uniformProjectId: process.env.UNIFORM_PROJECT_ID,
    uniformApiKey: process.env.UNIFORM_API_KEY,
    uniformCliBaseUrl: process.env.UNIFORM_CLI_BASE_URL,
    uniformPreviewSecret: process.env.UNIFORM_PREVIEW_SECRET,
  },
  publicRuntimeConfig: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
    appVersion: process.env.npm_package_version || '',
    algoliaApplicationId: process.env.ALGOLIA_APPLICATION_ID,
    algoliaSearchKey: process.env.ALGOLIA_SEARCH_KEY,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.ctfassets.net' },
    ],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
  // This is added to make bundled enhancers work, otherwise you might get an error on startup.
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
