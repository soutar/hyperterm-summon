const { hideWindows, showWindows } = require('../windows')
const { generateWindow, generateWindowSet } = require('../../fixtures/windowSet')
const { generateApp } = require('../../fixtures/app')

const app = generateApp()
let win
let set = generateWindowSet(2)

describe('windows', () => {
  describe('hidewindows', () => {
    beforeAll(() => {
      app.getWindows.mockReturnValue(set)
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
        expect(win.minimize).not.toHaveBeenCalled()
      })

      it('does not hide', () => {
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

      it('focuses the last active window', () => {
        expect([...set][0].focus).not.toHaveBeenCalled()
        expect([...set][1].focus).toHaveBeenCalledTimes(1)
      })
    })

    describe('in windows OS', () => {
      it('does not show the app', () => {
        process.platform = 'win32'
        showWindows(app)

        expect(app.show).not.toHaveBeenCalled()
      })
    })

    describe('in macOS', () => {
      it('shows the app', () => {
        process.platform = 'darwin'
        showWindows(app)

        expect(app.show).toHaveBeenCalledTimes(1)
      })
    })
  })
})
