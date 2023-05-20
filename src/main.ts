import { app, BrowserWindow } from "electron"
import path from "node:path"
import config, { ConfigKey } from "./config.js"
import styles from "./styles/main.css"

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
      preload: path.join(__dirname, "preload.js"),
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

// This method will be called when Electron has finished initialization and is
// ready to create browser windows. Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the dock icon is
  // clicked and there are no other windows open.
  if (!BrowserWindow.getAllWindows().length) {
    createWindow()
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
