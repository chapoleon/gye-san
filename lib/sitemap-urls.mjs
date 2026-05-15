/**
 * sitemap.xml에 포함할 URL (실제 라우트만, trailing slash).
 * Pages Router + output: 'export' — public/sitemap.xml 및 빌드 후 out/ 동기화.
 */

export const SITEMAP_BASE = 'https://gye-san.com'

/** @type {{ path: string, priority: string, changefreq: string }[]} */
export const SITEMAP_ENTRIES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about/', priority: '0.6', changefreq: 'weekly' },
  { path: '/contact/', priority: '0.6', changefreq: 'weekly' },
  { path: '/privacy/', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms/', priority: '0.5', changefreq: 'monthly' },
  { path: '/disclaimer/', priority: '0.5', changefreq: 'monthly' },
  { path: '/guides/', priority: '0.6', changefreq: 'weekly' },
  { path: '/calculators/salary/', priority: '0.8', changefreq: 'weekly' },
  { path: '/calculators/severance/', priority: '0.8', changefreq: 'weekly' },
  { path: '/calculators/hourly/', priority: '0.8', changefreq: 'weekly' },
  { path: '/calculators/weekly-holiday/', priority: '0.8', changefreq: 'weekly' },
  { path: '/calculators/vat/', priority: '0.8', changefreq: 'weekly' },
  { path: '/calculators/compound/', priority: '0.8', changefreq: 'weekly' },
  { path: '/calculators/loan-interest/', priority: '0.8', changefreq: 'weekly' }
]

export function buildSitemapXml(lastmod = new Date().toISOString().slice(0, 10)) {
  const urls = SITEMAP_ENTRIES.map(
    ({ path, priority, changefreq }) =>
      `  <url><loc>${SITEMAP_BASE}${path === '/' ? '/' : path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}
