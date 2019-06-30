const {
  applyConfig,
  generateActivateCallback,
  onApp: summonOnApp,
} = require('../modules/app');
const { generateApp } = require('../fixtures/app');
const {
  generateBlurCallback,
  hideWindows,
  showWindows,
} = require('../modules/windows');
const { onApp, onUnload } = require('../index');
const dispose = require('../modules/dispose');

jest.mock('../modules/app');
jest.mock('../modules/windows');
jest.mock('../modules/dispose');

const app = generateApp();

describe('onApp', () => {
  beforeEach(() => {
    onApp(app);
  });

  it('generates a blur handler', () => {
    expect(generateBlurCallback).toHaveBeenCalledWith(hideWindows, app);
  });

  it('generates a activate handler', () => {
    expect(generateActivateCallback).toHaveBeenCalledWith(showWindows, app);
  });

  it('executes hyperterm-summon onApp', () => {
    expect(summonOnApp).toHaveBeenCalledWith(
      app,
      expect.any(Function),
      undefined
    );
  });
});

describe('onUnload', () => {
  beforeEach(() => {
    onUnload(app);
  });

  it('executes dispose', () => {
    expect(dispose).toHaveBeenCalledTimes(1);
  });
});
