const assert = require('assert')

const promisifyAll = require('../index')

describe('promisifyAll', () => {
  const inputA = 'testA'
  const inputB = 'testB'

  async function _testPromisification (object) {
    promisifyAll(object)

    assert(object.someFuncAsync !== undefined, 'someFuncAsync should exist')
    assert(object.someOtherFuncAsync !== undefined, 'someOtherFuncAsync should exist')

    const resultA = await object.someFuncAsync(inputA)
    const resultB = await object.someOtherFuncAsync(inputB)

    assert(resultA === inputA, 'promise should return the correct value')
    assert(resultB === inputB, 'promise should return the correct value')
  }

  it('should promisify all functions defined on an object', async () => {
    const object = {
      someFunc (input, callback) {
        callback(null, input)
      },
      someOtherFunc (input, callback) {
        callback(null, input)
      }
    }
    _testPromisification(object)
  })

  it('should promisify all functions defined on an object\'s prototype', async () => {
    class MyClass {
      someFunc (input, callback) {
        callback(null, input)
      }
      someOtherFunc (input, callback) {
        callback(null, input)
      }
    }

    const object = new MyClass()
    _testPromisification(object)
  })
})
