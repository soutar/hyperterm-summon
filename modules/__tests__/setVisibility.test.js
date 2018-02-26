const setVisibility = require('../setVisibility');
const { generateApp } = require('../../fixtures/app');

jest.useFakeTimers();

const app = generateApp();

describe('modules/setVisibility', () => {
  describe('when no dock', () => {
    it('does not throw error', () => {
      expect(() => setVisibility(undefined, { hide: true })).not.toThrow();
    });
  });

  describe('when dock is visibile', () => {
    it('hides the dock after a timeout', () => {
      app.dock.isVisible.mockReturnValue(true);
      setVisibility(app.dock, { hide: true });
      expect(app.dock.hide).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(app.dock.hide).toHaveBeenCalled();
    });
  });

  describe('when dock is hidden', () => {
    it('shows the dock after a timeout', () => {
      app.dock.isVisible.mockReturnValue(false);
      setVisibility(app.dock, { hide: false });
      expect(app.dock.show).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(app.dock.show).toHaveBeenCalled();
    });
  });

  describe('when dock hidden', () => {
    it('does not hide the dock', () => {
      app.dock.isVisible.mockReturnValue(false);
      setVisibility(app.dock, { hide: true });
      jest.runAllTimers();
      expect(app.dock.hide).not.toHaveBeenCalled();
    });
  });

  describe('when dock visible', () => {
    it('does not show the dock', () => {
      app.dock.isVisible.mockReturnValue(true);
      setVisibility(app.dock, { hide: false });
      jest.runAllTimers();
      expect(app.dock.show).not.toHaveBeenCalled();
    });
  });
});
