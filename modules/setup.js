const registerShortcut = require('hyperterm-register-shortcut');
const toggleWindowVisibility = require('./windows').toggleWindowVisibility;

const DEFAULTS = {
  hideDock: false
}
const windowSet = new Set([]);

module.exports = function setup (app) {
  const config = Object.assign({}, DEFAULTS, app.config.getConfig().summon);

  if (config.hideDock) {
    app.dock.hide();
  }

  registerShortcut('summon', toggleWindowVisibility)(app);

  app.on('activate', () => {
    showWindows([...windowSet], app);
  });
}
