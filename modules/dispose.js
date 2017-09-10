// const { unregisterShortcut } = require('hyperterm-register-shortcut')

module.exports = app => {
  app.dock.show()
  // TODO: Un-register shortcut when supported
  // unregisterShortcut()
  // TODO: Scope removeListener to specific functions
  app.removeListener('activate')
  app.removeListener('browser-window-focus')
  app.removeListener('browser-window-blur')
}
