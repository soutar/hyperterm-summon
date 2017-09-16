const { generateBlurCallback, hideWindows, showWindows } = require('../windows')
const { generateWindow, generateWindowSet } = require('../../fixtures/windowSet')
const { generateApp } = require('../../fixtures/app')

jest.useFakeTimers()

const app = generateApp()
let callback, win, hiddenApp, hiddenSet
let set = generateWindowSet(2)

describe('generateBlurCallback', () => {
  beforeAll(() => {
    callback = jest.fn()
    app.getWindows.mockReturnValue(set)
  })

  it('returns a function', () => {
    expect(generateBlurCallback(callback)).toEqual(
      expect.any(Function)
    )
  })

  describe('when no focused windows', () => {
    it('executes the callback', () => {
      generateBlurCallback(callback)(app)()

      jest.runAllTimers()

      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('when focused windows', () => {
    beforeAll(() => {
      win = generateWindow()
      win.isFocused.mockReturnValue(true)
      set.add(win)
    })

    afterAll(() => {
      set.delete(win)
    })

    it('does not execute the callback', () => {
      generateBlurCallback(callback)(app)()

      jest.runAllTimers()

      expect(callback).not.toHaveBeenCalled()
    })
  })
})

describe('hideWindows', () => {
  beforeAll(() => {
    app.getWindows.mockReturnValue(set)
  })

  it('gets the last focused window', () => {
    hideWindows(app)

    expect(app.getLastFocusedWindow).toHaveBeenCalled()
  })

  describe('when no visible windows', () => {
    beforeAll(() => {
      hiddenApp = generateApp()
      hiddenSet = generateWindowSet(3, { visible: false })
      hiddenApp.getWindows.mockReturnValue(hiddenSet)
    })

    it('does not hide windows', () => {
      process.platform = 'darwin'
      hideWindows(hiddenApp)
      expect([...hiddenSet][0].hide).not.toHaveBeenCalled()
      expect([...hiddenSet][1].hide).not.toHaveBeenCalled()
    })

    it('does not minimize windows', () => {
      process.platform = 'win32'
      hideWindows(hiddenApp)
      expect([...hiddenSet][0].minimize).not.toHaveBeenCalled()
      expect([...hiddenSet][1].minimize).not.toHaveBeenCalled()
    })

    it('does not get last focused window', () => {
      hideWindows(hiddenApp)

      expect(hiddenApp.getLastFocusedWindow).not.toHaveBeenCalled()
    })
  })

  describe('when full screen window', () => {
    beforeAll(() => {
      win = generateWindow()
      win.isFullScreen.mockReturnValue(true)
      set.add(win)
    })

    beforeEach(() => {
      hideWindows(app)
    })

    afterAll(() => {
      set.delete(win)
    })

    it('does not minimize', () => {
      process.platform = 'win32'
      expect(win.minimize).not.toHaveBeenCalled()
    })

    it('does not hide', () => {
      process.platform = 'darwin'
      expect(win.hide).not.toHaveBeenCalled()
    })
  })

  describe('in windows', () => {
    it('minimizes windows', () => {
      process.platform = 'win32'
      hideWindows(app)

      expect([...set][0].minimize).toHaveBeenCalledTimes(1)
    })
  })

  describe('in macOS', () => {
    beforeAll(() => {
      process.platform = 'darwin'
    })

    beforeEach(() => {
      hideWindows(app)
    })

    it('hides windows', () => {
      expect([...set][0].hide).toHaveBeenCalledTimes(1)
      expect([...set][1].hide).toHaveBeenCalledTimes(1)
    })

    it('hides the app', () => {
      expect(app.hide).toHaveBeenCalledTimes(1)
    })
  })
})

describe('showWindows', () => {
  describe('when zero windows', () => {
    beforeAll(() => {
      app.getWindows.mockReturnValue(new Set())
    })

    it('creates one window', () => {
      showWindows(app)

      expect(app.createWindow).toHaveBeenCalledTimes(1)
    })
  })

  describe('when existing windows', () => {
    beforeAll(() => {
      app.getWindows.mockReturnValue(set)
    })

    beforeEach(() => {
      showWindows(app)
    })

    it('creates zero wins', () => {
      expect(app.createWindow).not.toHaveBeenCalled()
    })

    it('shows each window', () => {
      expect([...set][0].show).toHaveBeenCalledTimes(1)
      expect([...set][1].show).toHaveBeenCalledTimes(1)
    })

    xit('focuses the last active window', () => {
      expect([...set][0].focus).not.toHaveBeenCalled()
      expect([...set][1].focus).toHaveBeenCalledTimes(1)
    })
  })

  describe('on supported platforms', () => {
    it('shows the app', () => {
      app.show = jest.fn()
      showWindows(app)

      expect(app.show).toHaveBeenCalledTimes(1)
    })
  })
})
