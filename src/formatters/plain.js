import _ from 'lodash'

const formatValue = (value) => {
  if (value === null) return 'null'
  if (_.isObject(value)) return '[complex value]'
  if (typeof value === 'string') {
    if (value === '') return '\'\''
    return `'${value}'`
  }
  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value)
  }
  return String(value)
}

const buildPath = (pathParts, key) => {
  return [...pathParts, key].join('.')
}

const handlers = {
  'added': ({ key, value, path }) =>
    `Property '${buildPath(path, key)}' was added with value: ${formatValue(value)}`,

  'deleted': ({ key, path }) =>
    `Property '${buildPath(path, key)}' was removed`,

  'changed': ({ key, oldValue, newValue, path }) =>
    `Property '${buildPath(path, key)}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`,

  'unchanged': () => [],

  'nested': ({ key, children, path }) =>
    plain(children, [...path, key]),

  'nested-added': ({ key, path }) =>
    `Property '${buildPath(path, key)}' was added with value: [complex value]`,

  'nested-deleted': ({ key, path }) =>
    `Property '${buildPath(path, key)}' was removed`,
}

const plain = (node, path = []) => {
  const lines = node.flatMap((item) => {
    const handler = handlers[item.type]
    if (!handler) return []

    const result = handler({ ...item, path })
    return result
  })
  return lines.join('\n')
}

export default plain
