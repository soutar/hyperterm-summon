const Windows = require('../Windows')
const { generateWindow, generateWindowSet } = require('../../fixtures/windowSet')
const { generateApp } = require('../../fixtures/app')

const app = generateApp()
let windows, win, set

describe('Windows', () => {
  describe('constructor', () => {
    beforeAll(() => {
      set = generateWindowSet(2)
      windows = new Windows(set, app)
    })

    it('stores the set in state', () => {
      expect(windows.set).toBe(set)
    })

    it('stores the app in state', () => {
      expect(windows.app).toBe(app)
    })
  })

  describe('addWindow', () => {
    beforeAll(() => {
      win = generateWindow()
      set = generateWindowSet(2)
      windows = new Windows(set, app)
    })

    it('adds to the set', () => {
      jest.spyOn(set, 'add')
      windows.addWindow(win)

      expect(set.add).toHaveBeenCalledTimes(1)
      expect(set.add).toHaveBeenCalledWith(win)

      set.add.mockRestore()
    })

    it('creates focus event handlers', () => {
      windows.addWindow(win)

      expect(win.on).toHaveBeenCalledWith('focus', expect.any(Function))
    })

    it('creates close event handlers', () => {
      windows.addWindow(win)

      expect(win.on).toHaveBeenCalledWith('close', expect.any(Function))
    })
  })

  describe('hideWindows', () => {
    beforeAll(() => {
      set = generateWindowSet(2)
      windows = new Windows(set, app)
    })

    describe('when full screen window', () => {
      it('does not minimize or hide', () => {
        win = generateWindow()
        win.isFullScreen.mockReturnValueOnce(true)
        windows.addWindow(win)
        windows.hideWindows()

        expect(win.minimize).not.toHaveBeenCalled()
        expect(win.hide).not.toHaveBeenCalled()
      })
    })

    describe('in Windows', () => {
      it('minimizes windows', () => {
        process.platform = 'win32'
        windows.hideWindows()

        expect([...windows.set][0].minimize).toHaveBeenCalledTimes(1)
      })
    })

    describe('in macOS', () => {
      it('hides windows', () => {
        process.platform = 'darwin'
        windows.hideWindows()

        expect([...windows.set][0].hide).toHaveBeenCalledTimes(1)
      })

      it('hides the app', () => {
        process.platform = 'darwin'
        windows.hideWindows()

        expect(app.hide).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('showWindows', () => {
    beforeAll(() => {
      set = generateWindowSet()
      windows = new Windows(set, app)
    })

    describe('when zero windows', () => {
      it('creates one window', () => {
        windows.showWindows()

        expect(app.createWindow).toHaveBeenCalledTimes(1)
      })
    })

    describe('when existing windows', () => {
      beforeAll(() => {
        windows.addWindow(generateWindow())
        windows.addWindow(generateWindow())
      })

      it('creates zero wins', () => {
        windows.showWindows()

        expect(app.createWindow).not.toHaveBeenCalled()
      })

      it('shows each window', () => {
        windows.showWindows()

        expect([...windows.set][0].show).toHaveBeenCalledTimes(1)
        expect([...windows.set][1].show).toHaveBeenCalledTimes(1)
      })

      it('focuses the last active window', () => {
        windows.showWindows()

        expect([...windows.set][0].focus).not.toHaveBeenCalled()
        expect([...windows.set][1].focus).toHaveBeenCalledTimes(1)
      })
    })

    describe('in Windows OS', () => {
      it('does not show the app', () => {
        process.platform = 'win32'
        windows.showWindows()

        expect(app.show).not.toHaveBeenCalled()
      })
    })

    describe('in macOS', () => {
      it('shows the app', () => {
        process.platform = 'darwin'
        windows.showWindows()

        expect(app.show).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('toggleWindowVisibility', () => {
    beforeAll(() => {
      set = generateWindowSet(2)
      windows = new Windows(set, app)
      jest.spyOn(windows, 'hideWindows')
      jest.spyOn(windows, 'showWindows')
    })

    describe('when focused windows', () => {
      beforeAll(() => {
        ;[...windows.set][0].isFocused.mockReturnValue(true)
      })

      it('hides windows', () => {
        windows.toggleWindowVisibility()

        expect(windows.hideWindows).toHaveBeenCalledTimes(1)
      })
    })

    describe('when no focused windows', () => {
      beforeAll(() => {
        ;[...windows.set][0].isFocused.mockReturnValue(false)
      })

      it('shows windows', () => {
        windows.toggleWindowVisibility(set, app)

        expect(windows.showWindows).toHaveBeenCalledTimes(1)
      })
    })
  })
})
