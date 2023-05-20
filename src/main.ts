import { app, BrowserWindow } from "electron"
import path from "path"

function createWindow() {
  const win = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
    width: 800,
  })

  win.loadFile("index.html")
}

app.whenReady().then(() => {
  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
