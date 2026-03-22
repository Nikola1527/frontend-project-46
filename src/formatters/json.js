import _ from 'lodash'

const buildPath = (pathParts, key) => [...pathParts, key].join('.')

const json = (node, path = []) => {
  const result = []

  for (const item of node) {
    const { key, type, value, children, newValue, oldValue } = item
    const currentPath = buildPath(path, key)

    switch (type) {
      case 'added':
        result.push({
          key: currentPath,
          type: 'added',
          value: _.isObject(value) ? '[complex value]' : value,
        })
        break

      case 'deleted':
        result.push({
          key: currentPath,
          type: 'deleted',
          value: _.isObject(value) ? '[complex value]' : value,
        })
        break

      case 'changed':
        result.push({
          key: currentPath,
          type: 'changed',
          oldValue: _.isObject(oldValue) ? '[complex value]' : oldValue,
          newValue: _.isObject(newValue) ? '[complex value]' : newValue,
        })
        break

      case 'unchanged':
        break

      case 'nested':
        result.push(...json(children, [...path, key]))
        break

      case 'nested-added':
        result.push({
          key: currentPath,
          type: 'added',
          value: '[complex value]',
        })
        break

      case 'nested-deleted':
        result.push({
          key: currentPath,
          type: 'deleted',
          value: '[complex value]',
        })
        break

      default:
        break
    }
  }

  return result
}

export default json
