module.exports = {
  extends: [
    'standard',
    'prettier',
    'prettier/standard'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      { 'singleQuote': true, 'trailingComma': 'es5' }
    ]
  },
  globals: {
    afterAll: true,
    afterEach: true,
    beforeAll: true,
    beforeEach: true,
    describe: true,
    expect: true,
    fdescribe: true,
    fit: true,
    it: true,
    jest: true,
    xdescribe: true,
    xit: true
  }
}
