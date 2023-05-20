module.exports = {
  makers: [
    {
      config: {
        background: "./assets/dmg-background.png",
        format: "ULFO",
      },
      name: "@electron-forge/maker-dmg",
    },
  ],
  packagerConfig: {},
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
