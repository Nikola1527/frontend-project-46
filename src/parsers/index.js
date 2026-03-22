import yaml from 'js-yaml'

const getParsedData = (content, format) => {
  if (format === '.json') {
    try {
      return JSON.parse(content)
    }
    catch {
      throw new Error('Unable to parse file JSON format')
    }
  }
  if (format === '.yml' || format === '.yaml') {
    try {
      return yaml.load(content)
    }
    catch {
      throw new Error('Unable to parse file YAML format')
    }
  }

  throw new Error('Invalid file content')
}

export default getParsedData
