const registerShortcut = require('hyperterm-register-shortcut');
const toggle = require('./toggle');

const DEFAULTS = {
  hideDock: false,
  hideOnBlur: false,
  hotkey: 'Ctrl+;',
  hideOnStart: true, //temporarliy for tests true
};

const applyConfig = (app, handleBlur, hideWindows) => {
  const config = Object.assign({}, DEFAULTS, app.config.getConfig().summon);

  // TODO: Unregister prior to registering when supported
  registerShortcut('summon', toggle, DEFAULTS.hotkey)(app);

  if (app.dock) {
    config.hideDock ? app.dock.hide() : app.dock.show();
  }

  if (!config.hideOnBlur) {
    app.removeListener('browser-window-blur', handleBlur);
  } else if (!app.listeners('browser-window-blur').includes(handleBlur)) {
    app.on('browser-window-blur', handleBlur);
  }
  // if (config.hideOnStart) { // commenting out - just to be sure it's not falsy
    toggle(app);
    hideWindows(app);
  // }
};

const generateActivateCallback = (callback, app) => event => callback(app);

const onApp = (app, callback, handleActivate, hideWindows) => {
  app.on('activate', handleActivate);
  callback();
  hideWindows(app) //aslo doensn't work here :(
  return app.config.subscribe(callback);
};

module.exports = {
  applyConfig,
  generateActivateCallback,
  onApp,
};
