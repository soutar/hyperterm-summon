const dispose = require('./modules/dispose');
const {
  applyConfig,
  generateActivateCallback,
  onApp,
} = require('./modules/app');
const {
  generateBlurCallback,
  hideWindows,
  showWindows,
} = require('./modules/windows');

let cfgUnsubscribe, handleActivate, handleBlur;

exports.onApp = app => {
  handleBlur = generateBlurCallback(hideWindows)(app);
  handleActivate = generateActivateCallback(showWindows)(app);
  cfgUnsubscribe = onApp(
    app,
    applyConfig.bind(this,app, handleBlur),
    handleActivate
  );
};

exports.onUnload = app => {
  dispose(app, { cfgUnsubscribe, handleActivate, handleBlur });
};
