import fs from 'node:fs'
import path from 'node:path'
import genDiff from '../src/index.js'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const fixturesPath = path.join(__dirname, '..', '__fixtures__')

const getFixturesPath = filename => path.join(fixturesPath, filename)
const readFixtures = filename =>
  fs.readFileSync(getFixturesPath(filename), 'utf8')

test('gendiff compares two flat JSON files correctly', () => {
  const result = genDiff(
    getFixturesPath('file1.json'),
    getFixturesPath('file2.json'),
  )
  const expected = readFixtures('expected.txt')
  expect(result).toBe(expected)
})

test('both files empty returns empty diff', () => {
  const result = genDiff(
    getFixturesPath('empty.json'),
    getFixturesPath('empty.json'),
  )
  expect(result).toBe('{\n}')
})

test('throws error when file does not exist', () => {
  expect(() =>
    genDiff('nonexistent.json', getFixturesPath('file1.json')),
  ).toThrow()
})

test('gendiff compares two YAML files correctly', () => {
  const result = genDiff(
    getFixturesPath('file1.yml'),
    getFixturesPath('file2.yml'),
  )
  const expected = readFixtures('expected-yaml.txt')
  expect(result).toBe(expected)
})

test('both files empty returns empty diff', () => {
  const result = genDiff(
    getFixturesPath('empty.yml'),
    getFixturesPath('empty.yml'),
  )
  expect(result).toBe('{\n}')
})

test('gendiff with plain format for JSON files', () => {
  const result = genDiff(
    getFixturesPath('file1.json'),
    getFixturesPath('file2.json'),
    'plain',
  )
  const expected = readFixtures('expected-plain.txt')
  expect(result).toBe(expected)
})

test('gendiff with plain format for YAML files', () => {
  const result = genDiff(
    getFixturesPath('file1.yml'),
    getFixturesPath('file2.yml'),
    'plain',
  )
  const expected = readFixtures('expected-plain-yml.txt')
  expect(result).toBe(expected)
})

test('gendiff with json format for JSON files', () => {
  const result = genDiff(
    getFixturesPath('file1.json'),
    getFixturesPath('file2.json'),
    'json',
  )
  const expected = readFixtures('expected-json.txt')
  expect(result).toBe(expected)
})

test('gendiff with json format for YAML files', () => {
  const result = genDiff(
    getFixturesPath('file1.yml'),
    getFixturesPath('file2.yml'),
    'json',
  )
  const expected = readFixtures('expected-json-yml.txt')
  expect(result).toBe(expected)
})
