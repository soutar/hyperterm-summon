const dispose = require('./modules/dispose');
const { generateActivateCallback, onApp } = require('./modules/app');
const {
  generateBlurCallback,
  hideWindows,
  showWindows,
} = require('./modules/windows');

let cfgUnsubscribe, handleActivate, handleBlur;

exports.onApp = app => {
  handleBlur = generateBlurCallback(hideWindows)(app);
  handleActivate = generateActivateCallback(showWindows)(app);

  cfgUnsubscribe = onApp(app, handleActivate, handleBlur);
};

exports.onUnload = app =>
  dispose(app, { cfgUnsubscribe, handleActivate, handleBlur });
