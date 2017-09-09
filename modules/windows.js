exports.hideWindows = app => {
  const windows = [...app.getWindows()]

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

exports.showWindows = app => {
  const windows = [...app.getWindows()]

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
