const registerShortcut = require('hyperterm-register-shortcut')
const toggle = require('../toggle')
const { applyConfig, generateActivateCallback, onApp } = require('../app')
const { generateApp } = require('../../fixtures/app')

jest.mock('../toggle')
jest.mock('../windows')
jest.mock('hyperterm-register-shortcut')

let app = generateApp()
let callback
const handleBlurMock = jest.fn()
const generateActivateCallbackMock = jest.fn()

describe('applyConfig', () => {
  describe('with default config', () => {
    beforeEach(() => {
      applyConfig(app, handleBlurMock)
    })

    it('registers the default hot key', () => {
      expect(registerShortcut).toHaveBeenCalledWith('summon', toggle, 'Ctrl+;')
    })

    it('shows the dock', () => {
      expect(app.dock.show).toHaveBeenCalled()
    })

    it('does not handle blur events', () => {
      expect(app.removeListener).toHaveBeenCalledWith('browser-window-blur', handleBlurMock)
    })
  })

  describe('with hideDock config enabled', () => {
    beforeEach(() => {
      app.config.getConfig.mockReturnValue({
        summon: {
          hideDock: true
        }
      })
      applyConfig(app, handleBlurMock)
    })

    it('hides the dock', () => {
      expect(app.dock.hide).toHaveBeenCalled()
    })
  })

  describe('with hideOnBlur config enabled', () => {
    beforeEach(() => {
      app.config.getConfig.mockReturnValue({
        summon: {
          hideOnBlur: true
        }
      })
      applyConfig(app, handleBlurMock)
    })

    it('handles blur events', () => {
      expect(app.on).toHaveBeenCalledWith('browser-window-blur', handleBlurMock)
    })
  })
})

describe('generateActivateCallback', () => {
  beforeAll(() => {
    callback = jest.fn()
  })

  it('returns a function', () => {
    expect(generateActivateCallback(callback)(app)).toBeInstanceOf(Function)
  })

  it('resulting callback shows the windows', () => {
    generateActivateCallback(callback)(app)()

    expect(callback).toHaveBeenCalledTimes(1)
  })
})

describe('onApp', () => {
  describe('with default config', () => {
    beforeEach(() => {
      onApp(app, handleBlurMock, generateActivateCallbackMock)
    })

    it('handles the activate event', () => {
      expect(app.on).toHaveBeenCalledWith('activate', expect.any(Function))
    })

    it('subscribes to config change', () => {
      expect(app.config.subscribe).toHaveBeenCalledTimes(1)
    })
  })
})
