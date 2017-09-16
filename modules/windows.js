const { debounce } = require('lodash')

let lastFocusedWindow

exports.generateBlurCallback = callback => app => (
  debounce(() => {
    const focusedWindows = [...app.getWindows()].some(w => w.isFocused())

    if (focusedWindows) {
      return false
    }

    callback(app)
  }, 100)
)

exports.hideWindows = app => {
  lastFocusedWindow = app.getLastFocusedWindow()
  const windows = [...app.getWindows()]

  windows.forEach(w => {
    if (w.isFullScreen()) {
      return
    }

    process.platform === 'win32'
      ? w.minimize()
      : w.hide()
  })

  if (typeof app.hide === 'function') {
    app.hide()
  }
}

exports.showWindows = app => {
  const windows = [...app.getWindows()]

  windows.length === 0
    ? app.createWindow()
    : windows.forEach(w => w.show())

  if (lastFocusedWindow) {
    lastFocusedWindow.focus()
  }

  if (typeof app.show === 'function') {
    app.show()
  }
}
