const registerShortcut = require('hyperterm-register-shortcut')
const toggle = require('./toggle')
const { hideWindows, showWindows } = require('./windows')

const DEFAULTS = {
  hideDock: false,
  hideOnBlur: false,
  hotkey: 'Ctrl+;'
}

module.exports = app => {
  const config = Object.assign({}, DEFAULTS, app.config.getConfig().summon)

  registerShortcut('summon', toggle, DEFAULTS.hotkey)(app)
  app.on('activate', () => { showWindows(app) })
  app.on('browser-window-focus', () => {
    // TODO: Set focused window to re-focus on show
  })

  if (config.hideDock) {
    app.dock.hide()
  }

  if (config.hideOnBlur) {
    app.on('browser-window-blur', hideWindows)
  }
}
