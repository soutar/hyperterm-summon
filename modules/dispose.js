// const { unregisterShortcut } = require('hyperterm-register-shortcut')
const { showWindows } = require('./windows')

module.exports = (app, callbacks) => {
  const { cfgUnsubscribe, handleActivate, handleBlur } = callbacks

  if (!cfgUnsubscribe || !handleActivate || !handleBlur) {
    return
  }

  showWindows(app)
  app.dock.show()
  // TODO: Unregister shortcut when supported
  // unregisterShortcut()

  cfgUnsubscribe()
  app.removeListener('activate', handleActivate)
  app.removeListener('browser-window-blur', handleBlur)
}
