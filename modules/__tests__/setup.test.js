const registerShortcut = require('hyperterm-register-shortcut')
const setup = require('../setup')
const toggle = require('../toggle')
const { generateApp } = require('../../fixtures/app')
const { hideWindows } = require('../windows')

jest.mock('../toggle')
jest.mock('../windows')
jest.mock('hyperterm-register-shortcut')

let app = generateApp()

describe('setup', () => {
  describe('with default config', () => {
    beforeEach(() => {
      setup(app)
    })

    it('registers the default hot key', () => {
      expect(registerShortcut).toHaveBeenCalledWith('summon', toggle, 'Ctrl+;')
    })

    it('handles the activate event', () => {
      expect(app.on).toHaveBeenCalledWith('activate', expect.any(Function))
    })

    it('handles the focus events', () => {
      expect(app.on).toHaveBeenCalledWith('browser-window-focus', expect.any(Function))
    })

    it('does not hide the dock', () => {
      expect(app.dock.hide).not.toHaveBeenCalled()
    })

    it('does not handle blur events', () => {
      expect(app.on).not.toHaveBeenCalledWith('browser-window-blur', expect.any(Function))
    })
  })

  describe('with hideDock config enabled', () => {
    beforeEach(() => {
      app.config.getConfig.mockReturnValueOnce({
        summon: {
          hideDock: true
        }
      })
      setup(app)
    })

    it('hides the dock', () => {
      expect(app.dock.hide).toHaveBeenCalled()
    })
  })

  describe('with hideOnBlur config enabled', () => {
    beforeEach(() => {
      app.config.getConfig.mockReturnValueOnce({
        summon: {
          hideOnBlur: true
        }
      })
      setup(app)
    })

    it('handles blur events', () => {
      expect(app.on).toHaveBeenCalledWith('browser-window-blur', hideWindows)
    })
  })
})
