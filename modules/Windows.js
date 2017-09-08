class Windows {
  constructor (set, app) {
    this.set = set
    this.app = app
  }

  addWindow (win) {
    this.set.add(win)

    win.on('focus', () => {
      this.set.delete(win)
      this.set.add(win)
    })

    win.on('close', () => {
      this.set.delete(win)
    })
  }

  hideWindows () {
    const windows = [...this.set]

    windows.forEach(win => {
      if (win.isFullScreen()) {
        return
      }

      process.platform === 'win32'
        ? win.minimize()
        : win.hide()
    })

    // Re-focuses the last active app for macOS only
    if (process.platform === 'darwin') {
      this.app.hide()
    }
  }

  showWindows () {
    const windows = [...this.set]

    if (windows.length === 0) {
      this.app.createWindow()
    } else {
      windows.forEach((win, index) => {
        if (index === windows.length - 1) {
          win.show()
          win.focus()
        } else {
          win.show()
        }
      })
    }

    if (process.platform !== 'win32') {
      this.app.show()
    }
  }

  toggleWindowVisibility () {
    const focusedWindows = [...this.set].filter(w => w.isFocused())

    focusedWindows.length > 0
      ? this.hideWindows(this.app)
      : this.showWindows(this.app)
  }
}

module.exports = Windows
