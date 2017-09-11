const registerShortcut = require('hyperterm-register-shortcut')
const toggle = require('../toggle')
const { applyConfig, onApp } = require('../setup')
const { generateApp } = require('../../fixtures/app')

jest.mock('../toggle')
jest.mock('hyperterm-register-shortcut')

let app = generateApp()
const handleBlur = jest.fn()

describe('applyConfig', () => {
  describe('with default config', () => {
    beforeEach(() => {
      applyConfig(app, handleBlur)
    })

    it('registers the default hot key', () => {
      expect(registerShortcut).toHaveBeenCalledWith('summon', toggle, 'Ctrl+;')
    })

    it('shows the dock', () => {
      expect(app.dock.show).toHaveBeenCalled()
    })

    it('does not handle blur events', () => {
      expect(app.removeListener).toHaveBeenCalledWith('browser-window-blur', handleBlur)
    })
  })

  describe('with hideDock config enabled', () => {
    beforeEach(() => {
      app.config.getConfig.mockReturnValue({
        summon: {
          hideDock: true
        }
      })
      applyConfig(app, handleBlur)
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
      applyConfig(app, handleBlur)
    })

    it('handles blur events', () => {
      expect(app.on).toHaveBeenCalledWith('browser-window-blur', handleBlur)
    })
  })
})

describe('onApp', () => {
  describe('with default config', () => {
    beforeEach(() => {
      onApp(app)
    })

    it('handles the activate event', () => {
      expect(app.on).toHaveBeenCalledWith('activate', expect.any(Function))
    })

    it('subscribes to config change', () => {
      expect(app.config.subscribe).toHaveBeenCalledTimes(1)
    })
  })
})
