import yaml from 'js-yaml'

const getParsedData = (content, format) => {
  switch (format) {
    case '.json':
      try {
        return JSON.parse(content)
      }
      catch {
        throw new Error('Unable to parse file JSON format')
      }

    case '.yml':
    case '.yaml':
      try {
        return yaml.load(content)
      }
      catch {
        throw new Error('Unable to parse file YAML format')
      }

    default:
      throw new Error('Invalid file content')
  }
}

export default getParsedData
