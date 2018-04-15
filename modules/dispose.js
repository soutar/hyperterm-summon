// const { unregisterShortcut } = require('hyperterm-register-shortcut')

module.exports = (app, callbacks = {}) => {
  const { cfgUnsubscribe, handleActivate, handleBlur } = callbacks;

  // TODO: Unregister shortcut when supported
  // unregisterShortcut()

  cfgUnsubscribe && cfgUnsubscribe();
  handleActivate && app.removeListener('activate', handleActivate);
  handleBlur && app.removeListener('browser-window-blur', handleBlur);
};
