const {
  addWindow,
  hideWindows,
  showWindows
} = require('../windows')
const { generateWindow, generateWindowSet } = require('../../fixtures/windowSet')
const { generateApp } = require('../../fixtures/app')

const app = generateApp()
let win, set

describe('addWindow', () => {
  beforeAll(() => {
    set = generateWindowSet()
    win = generateWindow()
  })

  it('adds to the set', () => {
    jest.spyOn(set, 'add')
    addWindow(set, win)

    expect(set.add).toHaveBeenCalledTimes(1)
    expect(set.add).toHaveBeenCalledWith(win)
  })

  it('creates focus event handlers', () => {
    addWindow(set, win)

    expect(win.on).toHaveBeenCalledWith('focus', expect.any(Function))
  })

  it('creates close event handlers', () => {
    addWindow(set, win)

    expect(win.on).toHaveBeenCalledWith('close', expect.any(Function))
  })
})

describe('hideWindows', () => {
  describe('when full screen window', () => {
    it('does not minimize or hide', () => {
      const windows = generateWindowSet(1)
      ;[...windows][0].isFullScreen.mockReturnValueOnce(true)
      hideWindows(windows, app)

      expect([...windows][0].minimize).not.toHaveBeenCalled()
      expect([...windows][0].hide).not.toHaveBeenCalled()
    })
  })

  describe('in Windows', () => {
    it('minimizes windows', () => {
      const windows = generateWindowSet(1)
      process.platform = 'win32'
      hideWindows(windows, app)

      expect([...windows][0].minimize).toHaveBeenCalledTimes(1)
    })
  })

  describe('in macOS', () => {
    it('hides windows', () => {
      const windows = generateWindowSet(1)
      process.platform = 'darwin'
      hideWindows(windows, app)

      expect([...windows][0].hide).toHaveBeenCalledTimes(1)
    })

    it('hides the app', () => {
      const windows = generateWindowSet(1)
      process.platform = 'darwin'
      hideWindows(windows, app)

      expect(app.hide).toHaveBeenCalledTimes(1)
    })
  })
})

describe('showWindows', () => {
  describe('when zero windows', () => {
    it('creates one window', () => {
      showWindows([], app)

      expect(app.createWindow).toHaveBeenCalledTimes(1)
    })
  })

  describe('when existing windows', () => {
    it('creates zero windows', () => {
      showWindows(generateWindowSet(1), app)

      expect(app.createWindow).not.toHaveBeenCalled()
    })

    it('shows each windowSet', () => {
      const windows = generateWindowSet(2)
      showWindows(windows, app)

      expect([...windows][0].show).toHaveBeenCalledTimes(1)
      expect([...windows][1].show).toHaveBeenCalledTimes(1)
    })

    it('focuses the last active window', () => {
      const windows = generateWindowSet(2)
      showWindows(windows, app)

      expect([...windows][0].focus).not.toHaveBeenCalled()
      expect([...windows][1].focus).toHaveBeenCalledTimes(1)
    })
  })

  describe('in Windows OS', () => {
    it('does not show the app', () => {
      process.platform = 'win32'
      const windows = generateWindowSet(1)
      showWindows(windows, app)

      expect(app.show).not.toHaveBeenCalled()
    })
  })

  describe('in macOS', () => {
    it('shows the app', () => {
      process.platform = 'darwin'
      const windows = generateWindowSet(1)
      showWindows(windows, app)

      expect(app.show).toHaveBeenCalledTimes(1)
    })
  })
})
