# hyperterm-summon

[![Build Status](https://travis-ci.org/soutar/hyperterm-summon.svg?branch=master)](https://travis-ci.org/soutar/hyperterm-summon)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Summon your Hyper windows with a system-wide hotkey.

In a multi-window situation, hyperterm-summon will remember the last active
window and restore focus to it.

If Hyper is already active when the hotkey is pressed, your terminal windows
will be hidden and (on macOS only) your previously-active application will
regain focus.

## Installation

Use the hyper command, bundled with your Hyper app, to install hyperterm-summon
by entering the following into Hyper:

```bash
hyper i hyperterm-summon
```

## Options

| Key          | Description                                       | Default  |
| ------------ | ------------------------------------------------- | -------- |
| `hideDock`   | Hide the Hyper icon in the dock and app switcher. | `false`  |
| `hideOnBlur` | Hide the Hyper when window loses focus.           | `false`  |
| `hotkey`     | Shortcut to toggle Hyper window visibility.       | `Ctrl+;` |

_NOTE:_ For a list of valid shortcuts, see [Electron Accelerators](https://github.com/electron/electron/blob/master/docs/api/accelerator.md).

## Example Config

```js
module.exports = {
  config: {
    summon: {
      hideDock: true,
      hideOnBlur: true,
      hotkey: 'Alt+Super+O',
    },
  },
  plugins: ['hyperterm-summon'],
};
```
