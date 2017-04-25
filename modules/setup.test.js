const setup = require('./setup');
const windows = require('./windows');

jest.mock('./windows')
jest.mock('hyperterm-register-shortcut');

let app;

describe('setup', () => {
  beforeAll(() => {
    app = {
      config: {
        getConfig: jest.fn(() => ({}))
      },
      dock: {
        hide: jest.fn()
      },
      on: jest.fn()
    }
  });

  afterEach(() => {
    app.dock.hide.mockClear()
    app.on.mockClear()
  })

  describe('with default config', () => {
    beforeEach(() => {
      setup(app);
    });

    it('does not hide the dock', () => {
      expect(app.dock.hide).not.toHaveBeenCalled();
    });

    it('handles blur events', () => {
      expect(app.on).toHaveBeenCalledWith('browser-window-blur', expect.any(Function));
    });
  });

  describe('with hideDock config enabled', () => {
    beforeEach(() => {
      app.config.getConfig.mockReturnValueOnce({
        summon: {
          hideDock: true
        }
      });
      setup(app);
    });

    it('hides the dock', () => {
      expect(app.dock.hide).toHaveBeenCalled();
    });
  });

  describe('with hideOnBlur config disabled', () => {
    beforeEach(() => {
      app.config.getConfig.mockReturnValueOnce({
        summon: {
          hideOnBlur: false
        }
      });
      setup(app);
    });

    it('does not handle blur events', () => {
      expect(app.on).not.toHaveBeenCalledWith('browser-window-blur', expect.any(Function));
    });
  });
});
