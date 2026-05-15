import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const out = path.join(root, 'out')
const base = 'https://gye-san.com'
const today = new Date().toISOString().slice(0, 10)

const WORKING_SLUGS = [
  'military',
  'pregnancy',
  'unemployment',
  'salary',
  'insurance',
  'vat',
  'acquisition-tax',
  'jeonse-loan',
  'capital-gains',
  'gift-tax',
  'calorie',
  'severance',
  'hourly',
  'commission',
  'compound',
  'bmr',
  'freelance',
  'gpa',
  'weekly-holiday',
  'annual-leave',
  'income-tax',
  'loan-interest'
]

function urlEntry(loc, priority = '0.8', changefreq = 'weekly') {
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
}

const staticUrls = [
  urlEntry(`${base}/`, '1.0'),
  urlEntry(`${base}/calculators/`, '0.9'),
  urlEntry(`${base}/guides/`, '0.7'),
  urlEntry(`${base}/about/`, '0.6'),
  urlEntry(`${base}/contact/`, '0.6'),
  urlEntry(`${base}/privacy/`, '0.5'),
  urlEntry(`${base}/terms/`, '0.5'),
  urlEntry(`${base}/disclaimer/`, '0.5')
]

const calcUrls = WORKING_SLUGS.map((slug) => urlEntry(`${base}/calculators/${slug}/`, '0.85'))

const mergedEntries = [...staticUrls, ...calcUrls]
const mergedXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mergedEntries.join('\n')}
</urlset>
`

if (!fs.existsSync(out)) {
  console.error('out/ missing — run `next build` before generate-sitemaps.mjs')
  process.exit(1)
}

fs.writeFileSync(path.join(out, 'sitemap.xml'), mergedXml, 'utf8')
console.log(`sitemap.xml written (${mergedEntries.length} URLs)`)
