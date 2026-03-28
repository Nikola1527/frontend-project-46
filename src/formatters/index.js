import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formatters = {
  stylish,
  plain,
  json: node => JSON.stringify(json(node), null, 2),
}

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
    case 'plain':
    case 'json':
      return formatters[formatName]

    default:
      throw new Error(`Unknown format: ${formatName}`)
  }
}

export default getFormatter
