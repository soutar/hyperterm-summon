const dispose = require('../dispose')
const { generateApp } = require('../../fixtures/app')
const { showWindows } = require('../windows')
// const { unregisterShortcut } = require('hyperterm-register-shortcut')

// jest.mock('hyperterm-register-shortcut')
jest.mock('../windows')

const app = generateApp()
const handleActivateMock = jest.fn()
const handleBlurMock = jest.fn()
const cfgUnsubscribeMock = jest.fn()

describe('dispose', () => {
  beforeEach(() => {
    dispose(
      app,
      {
        cfgUnsubscribe: cfgUnsubscribeMock,
        handleActivate: handleActivateMock,
        handleBlur: handleBlurMock
      }
    )
  })

  it('shows all windows', () => {
    expect(showWindows).toHaveBeenCalledTimes(1)
  })

  it('shows the dock icon', () => {
    expect(app.dock.show).toHaveBeenCalledTimes(1)
  })

  it('unsubscribes from config changes', () => {
    expect(cfgUnsubscribeMock).toHaveBeenCalledTimes(1)
  })

  xit('unregisters the shortcut', () => {
    // expect(unregisterShortcut).toHaveBeenCalledTimes(1)
  })

  it('removes the activate listener', () => {
    expect(app.removeListener).toHaveBeenCalledWith('activate', handleActivateMock)
  })

  it('removes the blur listener', () => {
    expect(app.removeListener).toHaveBeenCalledWith('browser-window-blur', handleBlurMock)
  })
})
