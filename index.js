const dispose = require('./dispose')
const middleware = require('./middleware')
const setup = require('./modules/setup')

exports.onApp = setup
exports.onUnload = dispose
exports.middleware = middleware
