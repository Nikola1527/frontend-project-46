import fs from 'node:fs'
import path from 'node:path'
import _ from 'lodash'
import getParsedData from './parsers/index.js'

const genDiff = (filepath1, filepath2) => {
  try {
    const data1 = fs.readFileSync(filepath1, 'utf8')
    const data2 = fs.readFileSync(filepath2, 'utf8')

    const ext1 = path.extname(filepath1)
    const ext2 = path.extname(filepath2)

    /* if (ext1 !== '.json' || ext2 !== '.json') {
      throw new Error('Only JSON files are supported for now')
    } */

    const obj1 = getParsedData(data1, ext1)
    const obj2 = getParsedData(data2, ext2)

    const buildDiff = (obj1, obj2) => {
      const allKeys = _.union(Object.keys(obj1), Object.keys(obj2))
      const sortKeys = _.sortBy(allKeys)

      const lines = sortKeys.reduce((acc, key) => {
        const hasInObj1 = _.has(obj1, key)
        const hasInObj2 = _.has(obj2, key)

        if (hasInObj1 && !hasInObj2) {
          acc.push(`  - ${key}: ${obj1[key]}`)
        }
        else if (!hasInObj1 && hasInObj2) {
          acc.push(`  + ${key}: ${obj2[key]}`)
        }
        else if (hasInObj1 && hasInObj2) {
          if (_.isEqual(obj1[key], obj2[key])) {
            acc.push(`    ${key}: ${obj1[key]}`)
          }
          else {
            acc.push(`  - ${key}: ${obj1[key]}`)
            acc.push(`  + ${key}: ${obj2[key]}`)
          }
        }

        return acc
      }, [])

      if (lines.length === 0) {
        return '{\n}'
      }
      return `{\n${lines.join('\n')}\n}`
    }

    return buildDiff(obj1, obj2)
  }
  catch (e) {
    throw new Error(`Error reading files: ${e.message}`)
  }
}

export default genDiff
