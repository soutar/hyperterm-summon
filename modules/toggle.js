const { hideWindows, showWindows } = require('./windows');

// TODO: This value would have to be managed in app and passed down.
let pinnedWindows = [{ pinned: false }, { pinned: true }, { pinned: false }];

module.exports = app => {
  const focusedWindows = [...app.getWindows()].filter(
    (w, i) => w.isVisible() && !pinnedWindows[i].pinned
  );

  focusedWindows.length > 0 ? hideWindows(app) : showWindows(app);
};
