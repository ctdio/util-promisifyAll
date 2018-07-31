'use strict';

const { promisify } = require('util')

const functionBlackListMap =
  Object.getOwnPropertyNames(Object.prototype)
    .reduce(function (map, functionName) {
      map[functionName] = true
      return map
    }, {});

function _promisifyAllFunctions (object) {
  for (const key of Object.getOwnPropertyNames(object)) {
    if (functionBlackListMap[key]) {
      continue;
    }

    const descriptor = Object.getOwnPropertyDescriptor(object, key)

    if (!descriptor.get) {
      const func = object[key]
      if (typeof func === 'function') {
        object[`${key}Async`] = promisify(func)
      }
    }
  }
}

module.exports = function (object) {
  _promisifyAllFunctions(object)

  const proto = Object.getPrototypeOf(object)
  if (proto) {
    _promisifyAllFunctions(proto)
  }

  return object
}
