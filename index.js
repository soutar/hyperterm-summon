const dispose = require('./modules/dispose')
const middleware = require('./modules/middleware')
const setup = require('./modules/setup')

exports.middleware = middleware
exports.onApp = setup
exports.onUnload = dispose
