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
    await _testPromisification(object)
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
    await _testPromisification(object)
  })

  context('when directly promisifing a prototype', () => {
    it('should all functions defined on an object\'s prototype', async () => {
      class MyClass {
        someFunc (input, callback) {
          callback(null, input)
        }
      }

      promisifyAll(MyClass.prototype)
      const instance = new MyClass()
      const input = 'input'
      const result = await instance.someFuncAsync(input)

      assert(result === input, 'result should match input')
    })
  })

  context('objects with function getters', () => {
    const propertyName = 'someProperty'
    let testObject

    beforeEach(() => {
      testObject = {
        someOtherProperty: false,

        someFunc (input, callback) {
          callback(null, input)
        }
      }

      Object.defineProperty(testObject, propertyName, {
        get: function () {
          throw new Error('Should not triggered')
        }
      })
    })

    it('should be able to promisify objects that contain properties with ' +
    'getter functions', async () => {
      promisifyAll(testObject)

      const input = 'input'
      const result = await testObject.someFuncAsync(input)
      assert(result === input, 'result should match input')
    })
  })
})
