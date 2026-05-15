/**
 * 빌드 산출물 out/_redirects에 sitemap → sitemap-index 리다이렉트가 없는지 검증·제거.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const redirectsPath = path.join(root, 'out', '_redirects')

if (!fs.existsSync(redirectsPath)) {
  console.error('out/_redirects missing — run next build first')
  process.exit(1)
}

const raw = fs.readFileSync(redirectsPath, 'utf8')
const lines = raw.split(/\r?\n/)
const bad = lines.filter((l) => /sitemap/i.test(l))
const cleaned = lines.filter((l) => !/sitemap/i.test(l))

if (bad.length > 0) {
  console.warn('Removing sitemap-related redirect lines from out/_redirects:')
  bad.forEach((l) => console.warn('  ', l))
  fs.writeFileSync(redirectsPath, cleaned.join('\n').replace(/\n*$/, '\n'), 'utf8')
}

const after = fs.readFileSync(redirectsPath, 'utf8')
if (/sitemap/i.test(after)) {
  console.error('FAIL: out/_redirects still contains sitemap redirect')
  process.exit(1)
}

console.log('OK: out/_redirects has no sitemap redirect rules')
