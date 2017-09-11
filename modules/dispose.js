// const { unregisterShortcut } = require('hyperterm-register-shortcut')

module.exports = (app, handleActivate, handleBlur) => {
  app.dock.show()
  // TODO: Un-register shortcut when supported
  // unregisterShortcut()
  app.removeListener('activate', handleActivate)
  app.removeListener('browser-window-blur', handleBlur)
}
