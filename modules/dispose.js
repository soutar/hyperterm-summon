// const { unregisterShortcut } = require('hyperterm-register-shortcut')
const { showWindows } = require('./windows')

module.exports = (app, handleActivate, handleBlur) => {
  showWindows(app)
  app.dock.show()
  // TODO: Un-register shortcut when supported
  // unregisterShortcut()
  app.removeListener('activate', handleActivate)
  app.removeListener('browser-window-blur', handleBlur)
}
