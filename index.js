const dispose = require('./modules/dispose')
const { onApp } = require('./modules/setup')

exports.onApp = onApp
exports.onUnload = dispose
