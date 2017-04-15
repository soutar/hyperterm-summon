function showWindows (windows, app) {
  windows.forEach((win, index) => {
    if (index === windows.length-1) {
      win.focus();
    } else {
      win.show();
    }
  });
  if (process.platform !== 'win32') app.show();
}

function hideWindows (windows, app) {
  windows.forEach(win => {
    if (win.isFullScreen()) return;
    if (process.platform === 'win32') {
      win.minimize();
    } else {
      win.hide();
    }
  });
  if (process.platform !== 'win32') app.hide(); // Mac OS only (re-focuses the last active app)
}

function toggleWindowVisibility (windows, app) {
  const focusedWindows = windows.filter(window => window.isFocused());
  if (focusedWindows.length > 0) {
    hideWindows(windows, app);
  } else {
    showWindows(windows, app);
  }
}

function addWindow (windows, window) {
  windows.add(window);
  window.on('focus', () => {
    windows.delete(window);
    windows.add(window);
  });
  window.on('close', () => {
    windows.delete(window);
  });
}

module.exports = {
  addWindow,
  hideWindows,
  showWindows,
  toggleWindowVisibility
}
