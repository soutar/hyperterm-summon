const dispose = require('./modules/dispose')
const { handleActivate, onApp } = require('./modules/app')
const { handleBlur } = require('./modules/windows')

exports.onApp = app => onApp(app, handleActivate, handleBlur)
exports.onUnload = app => dispose(app, handleActivate, handleBlur)
