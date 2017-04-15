function showWindows (windows, app) {
  windows.forEach((win, index) => {
    if (index === windows.length - 1) {
      win.show();
      win.focus();
    } else {
      win.show();
    }
  });

  if (process.platform !== 'win32') {
    app.show();
  }
}

function hideWindows (windows, app) {
  windows.forEach(win => {
    if (win.isFullScreen()) {
      return;
    }

    process.platform === 'win32'
      ? win.minimize()
      : win.hide();
  });

  // Re-focuses the last active app for macOS only
  if (process.platform !== 'win32') {
    app.hide();
  }
}

function toggleWindowVisibility (app, windowSet) {
  const windows = [...windowSet];
  const focusedWindows = windows.filter(window => window.isFocused());

  focusedWindows.length > 0
    ? hideWindows(windows, app)
    : showWindows(windows, app);
}

function addWindow (window, windowSet) {
  windowSet.add(window);

  window.on('focus', () => {
    windowSet.delete(window);
    windowSet.add(window);
  });

  window.on('close', () => {
    windowSet.delete(window);
  });
}

module.exports = {
  addWindow,
  hideWindows,
  showWindows,
  toggleWindowVisibility
}
