import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const outDir = path.join(root, 'public', 'icons')
const logo = path.join(root, 'public', 'img', 'ondasoop.png')

fs.mkdirSync(outDir, { recursive: true })

const solidPng = async (size) => {
  const r = Math.round(size * 0.185)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="100%" height="100%" rx="${r}" fill="#3b82f6"/>
</svg>`
  return sharp(Buffer.from(svg)).png().toBuffer()
}

async function main() {
  if (fs.existsSync(logo)) {
    await sharp(logo).resize(192, 192, { fit: 'cover', position: 'center' }).png().toFile(path.join(outDir, 'icon-192.png'))
    await sharp(logo).resize(512, 512, { fit: 'cover', position: 'center' }).png().toFile(path.join(outDir, 'icon-512.png'))
    console.log('PWA icons from public/img/ondasoop.png')
  } else {
    fs.writeFileSync(path.join(outDir, 'icon-192.png'), await solidPng(192))
    fs.writeFileSync(path.join(outDir, 'icon-512.png'), await solidPng(512))
    console.log('PWA icons fallback (theme + emoji SVG render)')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
