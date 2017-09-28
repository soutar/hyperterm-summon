exports.generateApp = () => ({
  config: {
    getConfig: jest.fn(() => ({})),
    subscribe: jest.fn()
  },
  createWindow: jest.fn(),
  dock: {
    hide: jest.fn(),
    show: jest.fn()
  },
  getLastFocusedWindow: jest.fn(),
  getWindows: jest.fn(() => new Set()),
  hide: jest.fn(),
  on: jest.fn(),
  removeListener: jest.fn(),
  show: jest.fn()
})
