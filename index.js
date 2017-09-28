const dispose = require('./modules/dispose')
const { generateActivateCallback, onApp } = require('./modules/app')
const { generateBlurCallback, hideWindows, showWindows } = require('./modules/windows')

let handleActivate, handleBlur

exports.onApp = app => {
  handleBlur = generateBlurCallback(hideWindows)(app)
  handleActivate = generateActivateCallback(showWindows)(app)

  onApp(app, handleActivate, handleBlur)
}
exports.onUnload = app => dispose(app, handleActivate, handleBlur)
