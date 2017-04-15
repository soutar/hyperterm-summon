const setup = require('./setup');

jest.mock('hyperterm-register-shortcut');

let app = {
  config: {
    getConfig: jest.fn(() => ({}))
  },
  dock: {
    hide: jest.fn()
  },
  on: jest.fn()
};

describe('setup', () => {
  describe('with default config', () => {
    beforeEach(() => {
      setup(app);
    });

    it('does not hide the dock', () => {
      expect(app.dock.hide).not.toHaveBeenCalled();
    });
  });

  describe('with hideDock config enabled', () => {
    beforeEach(() => {
      app.config.getConfig.mockReturnValueOnce({
        summon: {
          hideDock: true
        }
      })
      setup(app);
    });

    it('hides the dock', () => {
      expect(app.dock.hide).toHaveBeenCalled();
    });
  });
})
