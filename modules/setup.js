const registerShortcut = require('hyperterm-register-shortcut')
const Windows = require('./Windows')

const DEFAULTS = {
  hideDock: false,
  hideOnBlur: true,
  hotkey: 'Ctrl+;'
}

module.exports = (app, windowSet) => {
  const config = Object.assign({}, DEFAULTS, app.config.getConfig().summon)
  const windows = new Windows(windowSet, app)

  if (config.hideDock) {
    app.dock.hide()
  }

  registerShortcut('summon', windows.toggleWindowVisibility, DEFAULTS.hotkey)(windowSet, app)

  app.on('activate', () => {
    windows.showWindows()
  })

  if (config.hideOnBlur) {
    app.on('browser-window-blur', () => {
      const focusedWindows = [...windowSet].filter(w => w.isFocused())

      if (focusedWindows.length > 0) {
        return false
      }

      windows.hideWindows()
    })
  }
}
