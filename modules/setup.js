const registerShortcut = require('hyperterm-register-shortcut')
const toggle = require('./toggle')
const { hideWindows, showWindows } = require('./windows')

const DEFAULTS = {
  hideDock: false,
  hideOnBlur: false,
  hotkey: 'Ctrl+;'
}

const handleBlur = app => {
  const focusedWindows = [...app.getWindows()].some(w => w.isFocused())

  if (focusedWindows) {
    return false
  }

  hideWindows(app)
}

const applyConfig = app => {
  const config = Object.assign({}, DEFAULTS, app.config.getConfig().summon)

  registerShortcut('summon', toggle, DEFAULTS.hotkey)(app)

  config.hideDock
    ? app.dock.hide()
    : app.dock.show()

  const handleBlurApp = handleBlur.bind(this, app)

  config.hideOnBlur
    ? app.on('browser-window-blur', handleBlurApp)
    : app.removeListener('browser-window-blur', handleBlurApp)
}

const onApp = app => {
  app.on('activate', () => showWindows(app))
  applyConfig(app)
  app.config.subscribe(() => applyConfig(app))
}

module.exports = {
  applyConfig,
  onApp
}
