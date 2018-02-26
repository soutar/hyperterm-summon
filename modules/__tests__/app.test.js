const registerShortcut = require('hyperterm-register-shortcut');
const setVisibility = require('../setVisibility');
const toggle = require('../toggle');
const { applyConfig, generateActivateCallback, onApp } = require('../app');
const { generateApp } = require('../../fixtures/app');

jest.mock('../toggle');
jest.mock('../windows');
jest.mock('../setVisibility');
jest.mock('hyperterm-register-shortcut');

jest.useFakeTimers();

let app = generateApp();
let callback;
const handleBlurMock = jest.fn();
const generateActivateCallbackMock = jest.fn();

describe('applyConfig', () => {
  describe('with default config', () => {
    beforeEach(() => {
      applyConfig(app, handleBlurMock);
    });

    it('registers the default hot key', () => {
      expect(registerShortcut).toHaveBeenCalledWith('summon', toggle, 'Ctrl+;');
    });

    it('sets dock visibility', () => {
      expect(setVisibility).toHaveBeenCalled();
    });

    it('does not handle blur events', () => {
      expect(app.removeListener).toHaveBeenCalledWith(
        'browser-window-blur',
        handleBlurMock
      );
    });
  });

  describe('with hideDock config enabled', () => {
    beforeEach(() => {
      app.config.getConfig.mockReturnValue({ summon: { hideDock: true } });
      applyConfig(app, handleBlurMock);
    });

    it('sets dock visibility', () => {
      expect(setVisibility).toHaveBeenCalled();
    });
  });

  describe('with hideOnBlur config enabled', () => {
    beforeEach(() => {
      app.config.getConfig.mockReturnValue({
        summon: {
          hideOnBlur: true,
        },
      });
    });

    afterEach(() => {
      Array.prototype.includes.mockRestore();
    });

    describe('with no previous handler', () => {
      beforeEach(() => {
        jest.spyOn(Array.prototype, 'includes').mockReturnValue(false);
        applyConfig(app, handleBlurMock);
      });

      it('adds blur handler', () => {
        expect(app.on).toHaveBeenCalledWith(
          'browser-window-blur',
          handleBlurMock
        );
      });
    });

    describe('with previous handler', () => {
      beforeEach(() => {
        jest.spyOn(Array.prototype, 'includes').mockReturnValue(true);
        applyConfig(app, handleBlurMock);
      });

      it('does not add handler', () => {
        expect(app.on).not.toHaveBeenCalledWith(
          'browser-window-blur',
          handleBlurMock
        );
      });
    });
  });

  describe('when dock is undefined', () => {
    it('does not throw error', () => {
      const appMock = generateApp({ dock: undefined });
      expect(() => applyConfig(appMock, handleBlurMock)).not.toThrow();
    });
  });
});

describe('generateActivateCallback', () => {
  beforeAll(() => {
    callback = jest.fn();
  });

  it('returns a function', () => {
    expect(generateActivateCallback(callback)(app)).toBeInstanceOf(Function);
  });

  it('resulting callback shows the windows', () => {
    generateActivateCallback(callback)(app)();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('onApp', () => {
  describe('with default config', () => {
    beforeEach(() => {
      callback = jest.fn();
      onApp(app, callback, handleBlurMock, generateActivateCallbackMock);
    });

    it('handles the activate event', () => {
      expect(app.on).toHaveBeenCalledWith('activate', expect.any(Function));
    });

    it('executes the callback', () => {
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('subscribes to config change', () => {
      expect(app.config.subscribe).toHaveBeenCalledWith(callback);
    });
  });
});
