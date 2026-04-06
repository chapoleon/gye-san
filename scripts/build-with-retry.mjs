import { spawnSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
process.chdir(root)

const max = 5
for (let i = 0; i < max; i++) {
  try {
    fs.rmSync(path.join(root, '.next'), { recursive: true, force: true })
  } catch {
    /* ignore */
  }
  const r = spawnSync('npx', ['next', 'build'], {
    stdio: 'inherit',
    shell: true,
    cwd: root,
    env: { ...process.env }
  })
  if (r.status === 0) {
    spawnSync(process.execPath, [path.join(__dirname, 'generate-sitemaps.mjs')], {
      stdio: 'inherit',
      cwd: root
    })
    process.exit(0)
  }
  console.warn(`build attempt ${i + 1}/${max} failed (Windows EBUSY 등으로 재시도)`)
}
process.exit(1)
