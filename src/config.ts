import Store from "electron-store"
import { is } from "electron-util"

interface LastWindowState {
  bounds: {
    height: number
    width: number
    x: number | undefined
    y: number | undefined
  }
  fullscreen: boolean
  maximized: boolean
}

export enum ConfigKey {
  LastWindowState = "lastWindowState",
}

interface ConfigStore {
  [ConfigKey.LastWindowState]: LastWindowState
}

const config = new Store<ConfigStore>({
  defaults: {
    [ConfigKey.LastWindowState]: {
      bounds: {
        height: 900,
        width: 550,
        x: undefined,
        y: undefined,
      },
      fullscreen: false,
      maximized: false,
    },
  },
  migrations: {},
  name: is.development ? "config.dev" : "config",
  schema: {
    [ConfigKey.LastWindowState]: {
      properties: {
        bounds: {
          properties: {
            height: { type: "number" },
            width: { type: "number" },
            x: { type: "number" },
            y: { type: "number" },
          },
          type: "object",
        },
        fullscreen: { type: "boolean" },
        maximized: { type: "boolean" },
      },
      type: "object",
    },
  },
})

export default config
