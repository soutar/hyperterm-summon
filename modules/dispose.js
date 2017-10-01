// const { unregisterShortcut } = require('hyperterm-register-shortcut')
const { showWindows } = require('./windows')

module.exports = (app, callbacks) => {
  const { handleActivate, handleBlur, cfgUnsubscribe } = callbacks

  showWindows(app)
  app.dock.show()
  // TODO: Un-register shortcut when supported
  // unregisterShortcut()
  cfgUnsubscribe()
  app.removeListener('activate', handleActivate)
  app.removeListener('browser-window-blur', handleBlur)
}
