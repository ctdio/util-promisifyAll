const { promisify } = require('util')

function _promisifyAllFunctions (object) {
  for (const key of Object.getOwnPropertyNames(object)) {
    const func = object[key]
    if (typeof func === 'function') {
      object[`${key}Async`] = promisify(func)
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
