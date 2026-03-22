import fs from 'node:fs'
import path from 'node:path'
import getParsedData from './parsers/index.js'
import buildDiffTree from './buildDiffTree.js'
import getFormatter from './formatters/index.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
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

    const diffTree = buildDiffTree(obj1, obj2)
    const formatter = getFormatter(formatName)
    const formatted = formatter(diffTree)
    if (formatName === 'stylish') {
      if (formatted === '') {
        return '{\n}'
      }
      return `{\n${formatted}\n}`
    }
    return formatted
  }
  catch (e) {
    throw new Error(`Error reading files: ${e.message}`)
  }
}

export default genDiff
