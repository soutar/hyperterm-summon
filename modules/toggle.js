const { hideWindows, showWindows } = require('./windows');

module.exports = app => {
  // @NOTE: Linux reports blurred windows as focused, so also use isVisible
  const focusedWindows = [...app.getWindows()].filter(
    w => w.isFocused() && w.isVisible()
  );

  focusedWindows.length > 0 ? hideWindows(app) : showWindows(app);
};
