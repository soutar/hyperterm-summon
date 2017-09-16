const generateWindowSet = (count, opts = {}) => {
  const windows = []

  for (var i = 0; i < count; i++) {
    windows.push(generateWindow(opts))
  }

  return new Set(windows)
}

const generateWindow = ({ focused = false, fullScreen = false, visible = true } = {}) => ({
  focus: jest.fn(),
  hide: jest.fn(),
  isFocused: jest.fn(() => focused),
  isFullScreen: jest.fn(() => fullScreen),
  isVisible: jest.fn(() => visible),
  minimize: jest.fn(),
  on: jest.fn(),
  show: jest.fn()
})

module.exports = {
  generateWindow,
  generateWindowSet
}
