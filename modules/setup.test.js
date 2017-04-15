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
  describe('shows the dock icon by default', () => {
    beforeEach(() => {
      setup(app);
    });

    it('hides the dock', () => {
      expect(app.dock.hide).not.toHaveBeenCalled();
    });
  });

  describe('hides the dock icon when configured', () => {
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
