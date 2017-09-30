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
  const visibleWindows = [...app.getWindows()].filter(w => w.isVisible())

  if (!visibleWindows.length) {
    return false
  }

  lastFocusedWindow = app.getLastFocusedWindow()

  visibleWindows.forEach(w => {
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

  if (lastFocusedWindow && !lastFocusedWindow.isDestroyed()) {
    lastFocusedWindow.focus()
  }

  if (typeof app.show === 'function') {
    app.show()
  }
}
