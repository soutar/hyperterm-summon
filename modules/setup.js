const registerShortcut = require('hyperterm-register-shortcut')
const {
  hideWindows,
  showWindows,
  toggleWindowVisibility
} = require('./windows')

const DEFAULTS = {
  hideDock: false,
  hideOnBlur: true,
  hotkey: 'Ctrl+;'
}

module.exports = (app, windowSet) => {
  const config = Object.assign({}, DEFAULTS, app.config.getConfig().summon)

  if (config.hideDock) {
    app.dock.hide()
  }

  registerShortcut('summon', toggleWindowVisibility, DEFAULTS.hotkey)(windowSet, app)

  app.on('activate', () => {
    showWindows(windowSet, app)
  })

  if (config.hideOnBlur) {
    app.on('browser-window-blur', () => {
      const focusedWindows = [...windowSet].filter(w => w.isFocused())

      if (focusedWindows.length > 0) {
        return false
      }

      hideWindows(windowSet, app)
    })
  }
}
