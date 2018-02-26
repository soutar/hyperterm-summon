// const { unregisterShortcut } = require('hyperterm-register-shortcut')
const setVisibility = require('./setVisibility');
const { showWindows } = require('./windows');

module.exports = (app, callbacks = {}) => {
  const { cfgUnsubscribe, handleActivate, handleBlur } = callbacks;

  showWindows(app);
  setVisibility(app.dock, { hide: false });
  // TODO: Unregister shortcut when supported
  // unregisterShortcut()

  cfgUnsubscribe && cfgUnsubscribe();
  handleActivate && app.removeListener('activate', handleActivate);
  handleBlur && app.removeListener('browser-window-blur', handleBlur);
};
