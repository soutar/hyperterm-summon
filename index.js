const dispose = require('./modules/dispose')
const { handleActivate, onApp } = require('./modules/app')
const { generateBlurCallback, hideWindows } = require('./modules/windows')

let handleBlur

exports.onApp = app => {
  handleBlur = generateBlurCallback(hideWindows)(app)
  onApp(app, handleActivate, handleBlur)
}
exports.onUnload = app => dispose(app, handleActivate, handleBlur)
