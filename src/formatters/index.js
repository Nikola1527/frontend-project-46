import stylish from './stylish.js'
import plain from './plain.js'

const formatters = {
  stylish,
  plain,
}

const getFormatter = (formatName) => {
  const formatter = formatters[formatName]
  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}`)
  }
  return formatter
}

export default getFormatter
