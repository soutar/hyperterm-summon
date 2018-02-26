const setVisibility = require('../setVisibility');
const { generateApp } = require('../../fixtures/app');

jest.useFakeTimers();

const app = generateApp();

describe('modules/setVisibility', () => {
  it('hides the dock after a timeout', () => {
    setVisibility(app.dock, { hide: true });
    expect(app.dock.hide).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(app.dock.hide).toHaveBeenCalled();
  });

  it('shows the dock after a timeout', () => {
    setVisibility(app.dock, { hide: false });
    expect(app.dock.show).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(app.dock.show).toHaveBeenCalled();
  });
});
