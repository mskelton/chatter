import { app, BrowserWindow } from "electron"
import fs from "node:fs"
import path from "node:path"
import config, { ConfigKey } from "./config.js"

function createWindow() {
  const lastWindowState = config.get(ConfigKey.LastWindowState)

  const win = new BrowserWindow({
    height: lastWindowState.bounds.height,
    minHeight: 600,
    minWidth: 400,
    show: false,
    title: app.name,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.cjs"),
    },
    width: lastWindowState.bounds.width,
    x: lastWindowState.bounds.x,
    y: lastWindowState.bounds.y,
  })

  if (lastWindowState.fullscreen && !win.isFullScreen()) {
    win.setFullScreen(lastWindowState.fullscreen)
  }

  if (lastWindowState.maximized && !win.isMaximized()) {
    win.maximize()
  }

  win.loadURL("https://chat.openai.com")

  win.webContents.on("dom-ready", async () => {
    const styles = fs.readFileSync(path.join(__dirname, "main.css"), "utf8")
    await win.webContents.insertCSS(styles)
    win.show()
  })

  function saveWindowState() {
    config.set(ConfigKey.LastWindowState, {
      bounds: win.getBounds(),
      fullscreen: win.isFullScreen(),
      maximized: win.isMaximized(),
    })
  }

  win.on("resize", saveWindowState)
  win.on("move", saveWindowState)
}

app.whenReady().then(() => {
  createWindow()

  app.on("activate", () => {
    if (!BrowserWindow.getAllWindows().length) {
      createWindow()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
