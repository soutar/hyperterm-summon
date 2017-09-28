const { hideWindows, showWindows } = require('./windows')

module.exports = app => {
  const focusedWindows = [...app.getWindows()].filter(w => w.isFocused())

  focusedWindows.length > 0
    ? hideWindows(app)
    : showWindows(app)
}
