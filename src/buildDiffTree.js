import _ from 'lodash'

const buildAddedTree = (obj) => {
  if (!_.isPlainObject(obj)) return null

  const keys = _.sortBy(Object.keys(obj))

  return keys.map((key) => {
    const value = obj[key]
    if (_.isPlainObject(value)) {
      return {
        key,
        type: 'nested',
        children: buildAddedTree(value),
      }
    }
    return { key, type: 'unchanged', value }
  })
}

const buildDeletedTree = (obj) => {
  if (!_.isPlainObject(obj)) return null

  const keys = _.sortBy(Object.keys(obj))

  return keys.map((key) => {
    const value = obj[key]
    if (_.isPlainObject(value)) {
      return {
        key,
        type: 'nested',
        children: buildDeletedTree(value),
      }
    }
    return { key, type: 'unchanged', value }
  })
}

const buildDiffTree = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2))
  const sortedKeys = _.sortBy(allKeys)

  return sortedKeys.map((key) => {
    const has1 = _.has(obj1, key)
    const has2 = _.has(obj2, key)

    if (has1 && !has2) {
      if (_.isPlainObject(obj1[key])) {
        return {
          key,
          type: 'nested-deleted',
          children: buildDeletedTree(obj1[key]),
        }
      }
      return { key, type: 'deleted', value: obj1[key] }
    }

    if (!has1 && has2) {
      if (_.isPlainObject(obj2[key])) {
        return {
          key,
          type: 'nested-added',
          children: buildAddedTree(obj2[key]),
        }
      }
      return { key, type: 'added', value: obj2[key] }
    }

    if (has1 && has2) {
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return {
          key,
          type: 'nested',
          children: buildDiffTree(obj1[key], obj2[key]),
        }
      }

      if (_.isPlainObject(obj1[key]) && !_.isPlainObject(obj2[key])) {
        return {
          key,
          type: 'changed',
          oldValue: obj1[key],
          newValue: obj2[key],
          deletedTree: buildDeletedTree(obj1[key]),
        }
      }
      if (!_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return {
          key,
          type: 'changed',
          oldValue: obj1[key],
          newValue: obj2[key],
          addedTree: buildAddedTree(obj2[key]),
        }
      }

      if (!_.isEqual(obj1[key], obj2[key])) {
        return {
          key,
          type: 'changed',
          oldValue: obj1[key],
          newValue: obj2[key],
        }
      }

      return { key, type: 'unchanged', value: obj1[key] }
    }

    return null
  }).filter(Boolean)
}

export default buildDiffTree
