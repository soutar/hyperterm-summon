const registerShortcut = require('hyperterm-register-shortcut')
const toggle = require('./toggle')
const { debounce } = require('lodash')
const { hideWindows, showWindows } = require('./windows')

let debounceHandleBlur

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

  config.hideOnBlur
    ? app.on('browser-window-blur', debounceHandleBlur)
    : app.removeListener('browser-window-blur', debounceHandleBlur)
}

const onApp = app => {
  debounceHandleBlur = debounce(handleBlur.bind(this, app), 100)
  app.on('activate', () => showWindows(app))
  applyConfig(app)
  app.config.subscribe(() => applyConfig(app))
}

module.exports = {
  applyConfig,
  onApp
}
