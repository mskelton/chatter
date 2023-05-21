/**
 * Get's the x or y location for the contents. This adjusts based on the size
 * of the placeholders.
 */
const loc = (pos) => pos + 130 / 2

/**
 * Offset the y-location by a touch to make it visually appear centered due
 * to the text underneath.
 */
const y = (pos) => loc(pos) - 10

/** @type {import("@electron-forge/shared-types").ForgeConfig} */
module.exports = {
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      config: {
        background: "./assets/dmg-background.png",
        "background-color": "#132933",
        contents: (opts) => [
          { path: "/Applications", type: "link", x: loc(428), y: y(85) },
          { path: opts.appPath, type: "file", x: loc(42), y: y(85) },
        ],
        format: "ULFO",
        icon: "./assets/icons/icon.icns",
      },
      name: "@electron-forge/maker-dmg",
    },
  ],
  packagerConfig: {
    appBundleId: "dev.mskelton.chatter",
    icon: "./assets/icons/icon",
  },
  plugins: [
    {
      config: {
        build: [
          {
            config: "vite.main.config.mjs",
            entry: "src/main.ts",
          },
          {
            config: "vite.preload.config.mjs",
            entry: "src/preload.ts",
          },
        ],
        renderer: [],
      },
      name: "@electron-forge/plugin-vite",
    },
  ],
  rebuildConfig: {},
}
