import _ from 'lodash'

const formatValue = (value) => {
  if (_.isObject(value)) return '[complex value]'
  if (typeof value === 'string'
    || typeof value === 'boolean'
    || typeof value === 'number'
    || value === null) {
    return String(value)
  }
}

const stylish = (node, depth = 0) => {
  const ident = ' '.repeat(depth * 4)

  const lines = node.map((item) => {
    const { key, type, value, children, oldValue, newValue, deletedTree, addedTree } = item

    if (type === 'nested') {
      const nestedLines = stylish(children, depth + 1)
      return `${ident}    ${key}: {\n${nestedLines}\n${ident}    }`
    }

    if (type === 'nested-deleted') {
      const nestedLines = stylish(children, depth + 1)
      return `${ident}  - ${key}: {\n${nestedLines}\n${ident}    }`
    }

    if (type === 'nested-added') {
      const nestedLines = stylish(children, depth + 1)
      return `${ident}  + ${key}: {\n${nestedLines}\n${ident}    }`
    }

    if (type === 'added') {
      return `${ident}  + ${key}: ${formatValue(value)}`
    }

    if (type === 'deleted') {
      return `${ident}  - ${key}: ${formatValue(value)}`
    }

    if (type === 'unchanged') {
      return `${ident}    ${key}: ${formatValue(value)}`
    }

    if (type === 'changed') {
      if (deletedTree) {
        const deletedLines = stylish(deletedTree, depth + 1)
        return `${ident}  - ${key}: {\n${deletedLines}\n${ident}    }\n${ident}  + ${key}: ${formatValue(newValue)}`
      }

      if (addedTree) {
        const addedLines = stylish(addedTree, depth + 1)
        return `${ident}  - ${key}: ${formatValue(oldValue)}\n${ident}  + ${key}: {\n${addedLines}\n${ident}    }`
      }

      return `${ident}  - ${key}: ${formatValue(oldValue)}\n${ident}  + ${key}: ${formatValue(newValue)}`
    }

    return ''
  })

  return lines.join('\n')
}

export default stylish
