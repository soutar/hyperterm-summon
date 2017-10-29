const registerShortcut = require('hyperterm-register-shortcut');
const toggle = require('./toggle');

const DEFAULTS = {
  hideDock: false,
  hideOnBlur: false,
  hotkey: 'Ctrl+;',
};

const applyConfig = (app, handleBlur) => {
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
};

const generateActivateCallback = callback => app => event => callback(app);

const onApp = (app, handleActivate, handleBlur) => {
  app.on('activate', handleActivate);
  applyConfig(app, handleBlur);
  return app.config.subscribe(() => applyConfig(app, handleBlur));
};

module.exports = {
  applyConfig,
  generateActivateCallback,
  onApp,
};
