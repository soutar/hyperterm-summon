# hyperterm-summon

Summon your Hyper windows with a system-wide hotkey.

In a multi-window situation, hyperterm-summon will remember the last active
window and restore focus to it.

If Hyper is already active when the hotkey is pressed, your terminal windows
will be hidden and (on macOS only) your previously-active application will
regain focus.

## Installation

Use the Hyper CLI, bundled with your Hyper app, to install hyperterm-summon
by entering the following into Hyper:

```bash
hyper i hyperterm-summon
```

## Options

| Key          | Description                                             | Default  |
| ------------ | ------------------------------------------------------- | -------- |
| `hideDock`   | Hide the Hyper icon in the dock and app switcher.       | `false`  |
| `hideOnBlur` | Hide Hyper when the windows lose focus.                 | `false`  |
| `hotkey`     | Shortcut<sup>1</sup> to toggle Hyper window visibility. | `Ctrl+;` |

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

<sup>1</sup> For a list of valid shortcuts, see [Electron Accelerators](https://github.com/electron/electron/blob/master/docs/api/accelerator.md).
