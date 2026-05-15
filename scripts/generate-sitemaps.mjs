import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildSitemapXml, SITEMAP_ENTRIES } from '../lib/sitemap-urls.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const out = path.join(root, 'out')
const publicDir = path.join(root, 'public')
const xml = buildSitemapXml()

if (!fs.existsSync(out)) {
  console.error('out/ missing — run `next build` before generate-sitemaps.mjs')
  process.exit(1)
}

fs.writeFileSync(path.join(out, 'sitemap.xml'), xml, 'utf8')
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')
console.log(`sitemap.xml written (${SITEMAP_ENTRIES.length} URLs) → out/ and public/`)
