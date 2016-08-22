const registerShortcut = require('hyperterm-register-shortcut');
const windowSet = new Set([]);

function showWindows (windows, app) {
  windows.forEach((win, index) => {
    if (index === windowSet.length-1) {
      win.focus();
    } else {
      win.show();
    }
  });
  app.show();
}

function hideWindows (windows, app) {
  windows.forEach(win => win.hide());
  app.hide(); // Mac OS only (re-focuses the last active app)
}

function toggleWindowVisibility (app) {
  const windows = [...windowSet];
  const focusedWindows = windows.filter(window => window.isFocused());
  if (focusedWindows.length > 0) {
    hideWindows(windows, app);
  } else {
    showWindows(windows, app);
  }
}

function addWindow (window) {
  windowSet.add(window);
  window.on('focus', () => {
    windowSet.delete(window);
    windowSet.add(window);
  });
  window.on('close', () => {
    windowSet.delete(window);
  });
}

function setup (app) {
  registerShortcut('summon', toggleWindowVisibility)(app);
  app.on('activate', () => {
    showWindows([...windowSet], app);
  });
}

module.exports = {
  onApp: setup,
  onWindow: addWindow
}
