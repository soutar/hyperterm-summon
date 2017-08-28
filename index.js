const setup = require('./modules/setup')
const { addWindow } = require('./modules/windows')

const windowSet = new Set([])

module.exports = {
  onApp: app => setup(app, windowSet),
  onWindow: window => addWindow(windowSet, window)
}
