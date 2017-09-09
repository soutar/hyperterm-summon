// const { unregisterShortcut } = require('hyperterm-register-shortcut')

module.exports = app => {
  app.dock.show()
  // unregisterShortcut()
  app.removeListener('activate')
  app.removeListener('browser-window-focus')
  app.removeListener('browser-window-blur')
}
