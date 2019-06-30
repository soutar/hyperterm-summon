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

// TODO: This value would have to be managed in app and passed down.
let pinnedWindows = [{ pinned: false }, { pinned: true }, { pinned: false }];

exports.hideWindows = app => {
  const visibleWindows = [...app.getWindows()].filter(
    (w, i) => w.isVisible() && !pinnedWindows[i].pinned
  );

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

  // TODO: Hiding the app would nullify pinned windows and would need to be
  // conditionally called.
  // if (typeof app.hide === 'function') {
  //   app.hide();
  // }
};

// NOTE: This rudimentary pinned windows works, but focus management is broken.
// There is likely no way to determine which unpinned window should regain focus
// without keeping an internal collection of windows.
//
// However, pinned windows will always gain focus during hide, which will break
// giving focus to the previously focused OS application. There is likely no way
// around this and makes this feature incompatible with this plugin.
exports.showWindows = app => {
  const windows = [...app.getWindows()]
    .filter((w, i) => !pinnedWindows[i].pinned)
    .sort(isFocused.bind(app));

  windows.length === 0 ? app.createWindow() : windows.forEach(w => w.show());

  // TODO: Hiding the app would nullify pinned windows and would need to be
  // conditionally called.
  // if (typeof app.show === 'function') {
  //   app.show();
  // }
};
