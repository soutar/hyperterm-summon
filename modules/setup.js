const registerShortcut = require('hyperterm-register-shortcut');
const toggleWindowVisibility = require('./windows').toggleWindowVisibility;

const DEFAULTS = {
  hideDock: false
}

module.exports = function setup (app, windowSet) {
  const config = Object.assign({}, DEFAULTS, app.config.getConfig().summon);

  if (config.hideDock) {
    app.dock.hide();
  }

  registerShortcut('summon', toggleWindowVisibility)(app, windowSet);

  app.on('activate', () => {
    showWindows([...windowSet], app);
  });
}
