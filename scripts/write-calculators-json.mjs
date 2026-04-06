import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const jsonPath = path.join(root, 'data', 'calculators.json')

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8')
console.log('wrote', data.calculators.length, 'calculators')
