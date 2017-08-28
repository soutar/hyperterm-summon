const generateWindowSet = count => {
  const windows = []

  for (var i = 0; i < count; i++) {
    windows.push(generateWindow())
  }

  return new Set(windows)
}

const generateWindow = () => ({
  focus: jest.fn(),
  hide: jest.fn(),
  isFocused: jest.fn(() => false),
  isFullScreen: jest.fn(() => false),
  minimize: jest.fn(),
  on: jest.fn(),
  show: jest.fn()
})

module.exports = {
  generateWindow,
  generateWindowSet
}
