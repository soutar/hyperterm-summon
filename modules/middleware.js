const dispose = require('./dispose')
const setup = require('./setup')

module.exports = store => next => action => {
  if (action.type === 'CONFIG_RELOAD') {
    dispose()
    setup()
  }

  next(action)
}
