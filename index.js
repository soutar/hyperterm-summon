const setup = require('modules/setup');
const addWindow = require('modules/windows').addWindow;

module.exports = {
  onApp: setup,
  onWindow: addWindow
}
