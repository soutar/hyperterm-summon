const middleware = require('../middleware')
const dispose = require('../dispose')
const setup = require('../setup')

jest.mock('../dispose')
jest.mock('../setup')

let action
const nextMock = jest.fn()

describe('middleware', () => {
  it('nexts the action', () => {
    action = { type: 'FOO' }
    middleware({})(nextMock)(action)

    expect(nextMock).toHaveBeenCalledWith(action)
  })

  describe('when matches CONFIG_RELOAD', () => {
    beforeAll(() => {
      action = { type: 'CONFIG_RELOAD' }
    })

    beforeEach(() => {
      middleware({})(nextMock)(action)
    })

    it('diposes the plugin', () => {
      expect(dispose).toHaveBeenCalledTimes(1)
    })

    it('sets up the plugin', () => {
      expect(setup).toHaveBeenCalledTimes(1)
    })
  })
})
