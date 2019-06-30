const { debounce } = require('lodash');

const isFocused = function(w) {
  return w === this.getLastFocusedWindow();
};

exports.generateBlurCallback = (callback, app) =>
  debounce(() => {
    const focusedWindows = [...app.getWindows()].some(w => w.isFocused());

    if (focusedWindows) {
      return false;
    }

    callback(app);
  }, 100);

exports.hideWindows = app => {
  const visibleWindows = [...app.getWindows()].filter(w => w.isVisible());

  if (!visibleWindows.length) {
    return false;
  }

  visibleWindows.sort(isFocused.bind(app)).forEach(w => {
    if (w.isFullScreen()) {
      return;
    }

    if (typeof w.hide === 'function') {
      w.hide();
    } else {
      w.minimize();
    }
  });

  if (typeof app.hide === 'function') {
    app.hide();
  }
};

exports.showWindows = app => {
  const windows = [...app.getWindows()].sort(isFocused.bind(app));

  windows.length === 0 ? app.createWindow() : windows.forEach(w => w.show());

  if (typeof app.show === 'function') {
    app.show();
  }
};
