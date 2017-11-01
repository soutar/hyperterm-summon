// const { unregisterShortcut } = require('hyperterm-register-shortcut')
const { showWindows } = require('./windows');

module.exports = (app, callbacks = {}) => {
  const { cfgUnsubscribe, handleActivate, handleBlur } = callbacks;

  showWindows(app);
  if (app.dock) {
    app.dock.show();
  }
  // TODO: Unregister shortcut when supported
  // unregisterShortcut()

  cfgUnsubscribe && cfgUnsubscribe();
  handleActivate && app.removeListener('activate', handleActivate);
  handleBlur && app.removeListener('browser-window-blur', handleBlur);
};
