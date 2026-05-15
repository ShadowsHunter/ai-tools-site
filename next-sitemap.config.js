/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://aitoolshub.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    // Higher priority for main pages
    const highPriority = ["/", "/ai-tools", "/blog"];
    return {
      loc: path,
      changefreq: highPriority.includes(path) ? "daily" : config.changefreq,
      priority: highPriority.includes(path) ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
