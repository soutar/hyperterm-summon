const generateApp = () => ({
  config: {
    getConfig: jest.fn(() => ({}))
  },
  createWindow: jest.fn(),
  dock: {
    hide: jest.fn(),
    show: jest.fn()
  },
  hide: jest.fn(),
  on: jest.fn(),
  removeListener: jest.fn(),
  show: jest.fn()
})

module.exports = {
  generateApp
}
