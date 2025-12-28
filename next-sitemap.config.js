module.exports = {
    siteUrl: 'https://pichristmas.netlify.app',
    generateRobotsTxt: true,
    exclude: ['/admin'],
    additionalPaths: async () => [
        { loc: '/es', changefreq: 'daily', priority: 0.7 },
        { loc: '/fr', changefreq: 'daily', priority: 0.7 },
    ],
}
