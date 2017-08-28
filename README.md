# hyperterm-summon
[![Build Status](https://travis-ci.org/soutar/hyperterm-summon.svg?branch=master)](https://travis-ci.org/soutar/hyperterm-summon)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Summon your Hyper windows with a system-wide hotkey. In a multi-window situation, hyperterm-summon will remember which window was active last and restore focus to it. If Hyper is already active when the hotkey is pressed, your terminal windows will be hidden and (on macOS only) your previously-active application will regain focus.

## Installation
1. Open your Hyper config file (i.e. `~/.hyper.js`) in your preferred text editor.
1. Add `hyperterm-summon` to the plugins array found in the Hyper config.

## Options
| Key          | Description                                       | Default  |
| ---          | -----------                                       | -------  |
| `hideDock`   | Hide the Hyper icon in the dock and app switcher. | `false`  |
| `hideOnBlur` | Hide the Hyper when window loses focus.           | `true`   |
| `hotkey`     | Shortcut to toggle Hyper window visibility.       | `Ctrl+;` |

*NOTE:* For a list of valid shortcuts, see [Electron Accelerators](https://github.com/electron/electron/blob/master/docs/api/accelerator.md).

## Example Config
```js
module.exports = {
  config: {
    summon: {
      hideDock: true,
      hideOnBlur: false,
      hotkey: 'Alt+Super+O'
    }
  },
  plugins: [
    'hyperterm-summon'
  ]
}
```
