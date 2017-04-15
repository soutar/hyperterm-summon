# hyperterm-summon
Summon your Hyperterm windows with a system-wide hotkey. In a multi-window situation, hyperterm-summon will remember which window was active last and restore focus to it. If HyperTerm is already active when the hotkey is pressed, your terminal windows will be hidden and (on macOS only) your previously-active application will regain focus.

## Installation
1. Add `hyperterm-summon` to your plugins array in `~/.hyperterm.js`.
2. Add a `summon` entry inside the `config` object.
3. Add a `hotkey` entry inside the `summon` object. Set the value to the shortcut you want to use (see [Electron Accelerators](https://github.com/electron/electron/blob/master/docs/api/accelerator.md) for valid shortcuts).

## Options
| Key        | Description                                       | Default |
| ---        | -----------                                       | ------- |
| `hotkey`   | Shortcut to toggle Hyper window visibility.       | None    |
| `hideDock` | Hide the Hyper icon in the dock and app switcher. | `false` |

## Example
```js
module.exports = {
  config: {
    summon: {
      hideDock: true,
      hotkey: 'Alt+Super+O'
    }
  },
  plugins: [
    'hyperterm-summon'
  ]
}
```

## Valid Shortcuts
Valid shortcuts are defined by Electron and are known as **Accelerators**. Accelerators can contain multiple modifiers and key codes, combined by the + character.

#### Examples:
* `CommandOrControl+A`
* `CommandOrControl+Shift+Z`

#### Available Modifiers
* `Command` (or `Cmd` for short)
* `Control` (or `Ctrl` for short)
* `CommandOrControl` (or `CmdOrCtrl` for short)
* `Alt`
* `Option`
* `AltGr`
* `Shift`
* `Super`

#### Available Key Codes
* `0` to `9`
* `A` to `Z`
* `F1` to `F24`
* Punctuations like `~`, `!`, `@`, `#`, `$`, etc.
* `Plus`
* `Space`
* `Tab`
* `Backspace`
* `Delete`
* `Insert`
* `Return` (or `Enter` as alias)
* `Up`, `Down`, `Left` and `Right`
* `Home` and `End`
* `PageUp` and `PageDown`
* `Escape` (or `Esc` for short)
* `VolumeUp`, `VolumeDown` and `VolumeMute`
* `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` and `MediaPlayPause`
* `PrintScreen`
