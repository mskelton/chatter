# Chatter

<div align="center">
  <p>ChatGPT desktop app.</p>
  <img
    alt="Screenshot"
    src="https://github.com/mskelton/chatter/assets/25914066/c7ad4c7d-0bed-43ee-bb57-6205dac91434"
    width="400"
  />
</div>

## Installation

Download the latest release of Chatter for your OS and follow the installation
process.

- [macOS](https://github.com/mskelton/chatter/releases/latest)
- Windows - coming soon!
- Linux - coming soon!

## Features

- Toggle to keep open on top of other windows.
- Keyboard shortcuts!

### Shortcuts

| Shortcut         | Action                                   |
| ---------------- | ---------------------------------------- |
| <kbd>cmd+n</kbd> | Start new chat                           |
| <kbd>cmd+j</kbd> | Toggle keep open on top of other windows |

## Contributing

Chatter is built with [Electron](https://electronjs.org/) and
packaged/distributed with [Electron Forge](https://www.electronforge.io). To
start contributing, first install the required packages using
[pnpm](https://pnpm.io).

```bash
pnpm install
```

## Running the app

```bash
pnpm dev
```

_Note: _

## Testing the packaged output

To test the packaged output on various operating systems, first run the `make`
task to package and compile the app.

```bash
pnpm make
```

Next, follow the OS-specific instructions for testing the installation.

### macOS

To run the app, run the following command after running `pnpm make`.

```bash
open out/Chatter-darwin-arm64/Chatter.app
```

To test the installer, run the following command after running `pnpm make`.

```bash
open out/make/Chatter-*.dmg
```

## Linting, formatting, and type checking

The following commands can be used to manually run ESLint, Prettier, and
TypeScript.

```bash
pnpm lint
pnpm format
pnpm ts
```
