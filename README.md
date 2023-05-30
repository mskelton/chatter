<div align="center">
  <h1>Chatter</h1>
  <p>ChatGPT desktop app.</p>
  <img
    alt="Screenshot"
    src="https://github.com/mskelton/chatter/assets/25914066/c7ad4c7d-0bed-43ee-bb57-6205dac91434"
    width="400"
  />
</div>

## Installation

Visit the [releases page](https://github.com/mskelton/chatter/releases/latest)
to download the latest release of Chatter for your OS and follow the
installation process

## Features

- Toggle to stay on top of other windows.
- Keyboard shortcuts!

### Shortcuts

| Shortcut               | Action                                       |
| ---------------------- | -------------------------------------------- |
| <kbd>cmd+n</kbd>       | Start new chat                               |
| <kbd>cmd+shift+j</kbd> | Toggle stay on top of other windows (global) |

## Contributing

Chatter is built with [Electron](https://electronjs.org/) and
packaged/distributed with [Electron Forge](https://www.electronforge.io). To
start contributing, first install the required packages using
[yarn](https://yarnpkg.com).

```bash
yarn
```

## Running the app

```bash
yarn dev
```

_Note: When running the app in development mode, the icon and name of the app
will be the stock Electron icon and name. The real icon is only used when
packaging._

## Testing the packaged output

To test the packaged output on various operating systems, first run the `make`
task to package and compile the app.

```bash
yarn make
```

Next, follow the OS-specific instructions for testing the installation.

### macOS

To run the app, run the following command after running `yarn make`.

```bash
open out/Chatter-darwin-arm64/Chatter.app
```

To test the installer, run the following command after running `yarn make`.

```bash
open out/make/Chatter-*.dmg
```

## Linting, formatting, and type checking

The following commands can be used to manually run ESLint, Prettier, and
TypeScript.

```bash
yarn lint
yarn format
yarn ts
```
