const addWindow = require('./modules/windows').addWindow
const setup = require('./modules/setup')

const windowSet = new Set([])

module.exports = {
  onApp: app => setup(app, windowSet),
  onWindow: window => addWindow(window, windowSet)
}
