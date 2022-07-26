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
const toggle = require('./modules/toggle');

let cfgUnsubscribe, handleActivate, handleBlur;

exports.onApp = app => {
  handleBlur = generateBlurCallback(hideWindows, app);
  handleActivate = generateActivateCallback(showWindows, app);
  //maybe it will work here? as it doens't work in app.js
  toggle(app);
  hideWindows(app);
  cfgUnsubscribe = onApp(
    app,
    applyConfig.bind(this, app, handleBlur, hideWindows),
    handleActivate,
    hideWindows,
  );
};

exports.onUnload = app => {
  dispose(app, { cfgUnsubscribe, handleActivate, handleBlur });
};
