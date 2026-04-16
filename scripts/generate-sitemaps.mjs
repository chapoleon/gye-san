import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const out = path.join(root, 'out')
const base = 'https://gye-san.com'
const today = new Date().toISOString().slice(0, 10)

function urlEntry(loc, lastmod = today) {
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`
}

const calcData = JSON.parse(fs.readFileSync(path.join(root, 'data', 'calculators.json'), 'utf8'))
const blogData = JSON.parse(fs.readFileSync(path.join(root, 'data', 'blog.json'), 'utf8'))

const calcUrls = [
  urlEntry(`${base}/`),
  urlEntry(`${base}/calculators/`),
  urlEntry(`${base}/about/`),
  urlEntry(`${base}/guides/`),
  urlEntry(`${base}/guides/ads-txt/`),
  urlEntry(`${base}/guides/about/`),
  urlEntry(`${base}/contact/`),
  urlEntry(`${base}/privacy/`),
  urlEntry(`${base}/terms/`),
  ...calcData.calculators.map((c) => urlEntry(`${base}/calculators/${c.slug}/`))
]

const blogUrls = (blogData.posts || []).map((p) =>
  urlEntry(`${base.replace(/\/$/, '')}${p.path.startsWith('/') ? p.path : '/' + p.path}`, p.lastmod || today)
)

const calcXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${calcUrls.join('\n')}
</urlset>
`

const blogXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogUrls.join('\n')}
</urlset>
`

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${base}/sitemap-calculators.xml</loc><lastmod>${today}</lastmod></sitemap>
  <sitemap><loc>${base}/sitemap-blog.xml</loc><lastmod>${today}</lastmod></sitemap>
</sitemapindex>
`

if (!fs.existsSync(out)) {
  console.error('out/ missing — run `next build` (static export) before generate-sitemaps.mjs')
  process.exit(1)
}

fs.writeFileSync(path.join(out, 'sitemap-calculators.xml'), calcXml, 'utf8')
fs.writeFileSync(path.join(out, 'sitemap-blog.xml'), blogXml, 'utf8')
fs.writeFileSync(path.join(out, 'sitemap-index.xml'), indexXml, 'utf8')

const mergedEntries = [...calcUrls, ...blogUrls]
const mergedXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mergedEntries.join('\n')}
</urlset>
`
fs.writeFileSync(path.join(out, 'sitemap.xml'), mergedXml, 'utf8')
console.log('sitemaps written to out/')
