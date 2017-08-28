const registerShortcut = require('hyperterm-register-shortcut')
const windows = require('./windows')

const DEFAULTS = {
  hideDock: false,
  hideOnBlur: true,
  hotkey: 'Ctrl+;'
}

module.exports = function setup (app, windowSet) {
  const config = Object.assign({}, DEFAULTS, app.config.getConfig().summon)

  if (config.hideDock) {
    app.dock.hide()
  }

  registerShortcut('summon', windows.toggleWindowVisibility, DEFAULTS.hotkey)(app, windowSet)

  app.on('activate', () => {
    windows.showWindows([...windowSet], app)
  })

  if (config.hideOnBlur) {
    app.on('browser-window-blur', () => {
      const focusedWindows = [...windowSet].filter(window => window.isFocused())

      if (focusedWindows.length > 0) {
        return false
      }

      windows.hideWindows([...windowSet], app)
    })
  }
}
