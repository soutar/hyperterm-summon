const registerShortcut = require('hyperterm-register-shortcut')
const toggle = require('./toggle')
const { debounce } = require('lodash')
const { hideWindows, showWindows } = require('./windows')

const DEFAULTS = {
  hideDock: false,
  hideOnBlur: false,
  hotkey: 'Ctrl+;'
}

const hideWindowsIfBlurred = app => {
  const focusedWindows = [...app.getWindows()].some(w => w.isFocused())

  if (focusedWindows) {
    return false
  }

  hideWindows(app)
}

const applyConfig = (app, handleBlur) => {
  const config = Object.assign({}, DEFAULTS, app.config.getConfig().summon)

  registerShortcut('summon', toggle, DEFAULTS.hotkey)(app)

  config.hideDock
    ? app.dock.hide()
    : app.dock.show()

  config.hideOnBlur
    ? app.on('browser-window-blur', handleBlur)
    : app.removeListener('browser-window-blur', handleBlur)
}

const onApp = app => {
  const handleBlur = debounce(hideWindowsIfBlurred.bind(this, app), 100)

  app.on('activate', () => showWindows(app))
  applyConfig(app, handleBlur)
  app.config.subscribe(() => applyConfig(app, handleBlur))
}

module.exports = {
  applyConfig,
  onApp
}
