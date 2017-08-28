function showWindows (set, app) {
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

function hideWindows (set, app) {
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

function toggleWindowVisibility (set, app) {
  const windows = [...set]
  const focusedWindows = windows.filter(window => window.isFocused())

  focusedWindows.length > 0
    ? hideWindows(windows, app)
    : showWindows(windows, app)
}

function addWindow (window, set) {
  set.add(window)

  window.on('focus', () => {
    set.delete(window)
    set.add(window)
  })

  window.on('close', () => {
    set.delete(window)
  })
}

module.exports = {
  addWindow,
  hideWindows,
  showWindows,
  toggleWindowVisibility
}
