const { dialog, globalShortcut } = require('electron');

const windowSet = new Set([]);

function registerSummonShortcut (app) {
  const { plugins, config } = app;
  function register (accelerator) {
    if (!accelerator) return;
    const registered = globalShortcut.register(accelerator, () => {
      const windows = [...windowSet];
      const hiddenWindows = windows.filter(window => !window.isVisible());
      if (hiddenWindows.length === 0) {
        windows.forEach(win => win.hide());
        app.hide(); // Mac OS only (re-focuses the last active app)
      } else {
        windows.forEach((win, index) => {
          if (index === windowSet.length-1) {
            win.focus();
          } else {
            win.show();
          }
        });
      }
    });

    if (!registered) {
      dialog.showMessageBox({
        message: `Could not register summon shortcut (${accelerator})`,
        buttons: ['Ok']
      });
    }
  }
  function unregister (accelerator) {
    if (!accelerator) return;
    globalShortcut.unregister(accelerator);
  }

  let cfg = plugins.getDecoratedConfig();
  const cfgUnsubscribe = config.subscribe(() => {
    const cfg_ = plugins.getDecoratedConfig();
    if (cfg_.summonShortcut !== cfg.summonShortcut) {
      unregister(cfg.summonShortcut);
      register(cfg_.summonShortcut, cfg.summonShortcut);
      cfg = cfg_;
    }
  });

  app.on('will-quit', () => {
    cfgUnsubscribe();
    globalShortcut.unregisterAll();
  });

  register(cfg.summonShortcut);
}

function addWindow (window) {
  windowSet.add(window);
  window.on('focus', () => {
    windowSet.delete(window);
    windowSet.add(window);
  });
  window.on('close', () => {
    windowSet.delete(window);
  });
}

module.exports = {
  onApp: registerSummonShortcut,
  onWindow: addWindow
}