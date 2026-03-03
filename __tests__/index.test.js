import fs from 'node:fs'
import path from 'node:path'
import genDiff from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

test('gendiff compares two flat JSON files correctly', () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  const file1 = path.join(__dirname, '..', '__fixtures__', 'file1.json')
  const file2 = path.join(__dirname, '..', '__fixtures__', 'file2.json')
  const expectedFile = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'expected.txt',
  )

  const expected = fs.readFileSync(expectedFile, 'utf8')
  const result = genDiff(file1, file2)

  expect(result).toBe(expected)
})
