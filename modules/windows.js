const addWindow = (set, win) => {
  set.add(win)

  win.on('focus', () => {
    set.delete(win)
    set.add(win)
  })

  win.on('close', () => {
    set.delete(win)
  })
}

const hideWindows = (set, app) => {
  const windows = [...set]

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
    app.hide()
  }
}

const showWindows = (set, app) => {
  const windows = [...set]

  if (windows.length === 0) {
    app.createWindow()
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
    app.show()
  }
}

const toggleWindowVisibility = (set, app) => {
  const focusedWindows = [...set].filter(w => w.isFocused())

  focusedWindows.length > 0
    ? hideWindows(set, app)
    : showWindows(set, app)
}

module.exports = {
  addWindow,
  hideWindows,
  showWindows,
  toggleWindowVisibility
}
