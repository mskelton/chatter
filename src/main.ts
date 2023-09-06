import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import path from 'node:path'
import autoUpdate from 'update-electron-app'
import config, { ConfigKey } from './config'
import { initMenu } from './menu'
import styles from './styles/main.css'

autoUpdate()

let win: BrowserWindow

function createWindow() {
  const lastWindowState = config.get(ConfigKey.LastWindowState)

  win = new BrowserWindow({
    alwaysOnTop: config.get(ConfigKey.StayOnTop),
    height: lastWindowState.bounds.height,
    minHeight: 600,
    minWidth: 400,
    show: false,
    title: app.name,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, '../renderer/preload.js'),
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

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }

  win.loadURL('https://chat.openai.com')

  win.webContents.on('dom-ready', async () => {
    await win.webContents.insertCSS(styles)
    win.webContents.send('startup', config.get(ConfigKey.StayOnTop))
    win.show()
  })

  function saveWindowState() {
    config.set(ConfigKey.LastWindowState, {
      bounds: win.getBounds(),
      fullscreen: win.isFullScreen(),
      maximized: win.isMaximized(),
    })
  }

  win.on('resize', saveWindowState)
  win.on('move', saveWindowState)
}

function toggleStayOnTop() {
  if (!win) return
  config.set(ConfigKey.StayOnTop, !config.get(ConfigKey.StayOnTop))
}

// This method will be called when Electron has finished initialization and is
// ready to create browser windows. Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  initMenu()

  globalShortcut.register('CommandOrControl+Shift+J', toggleStayOnTop)
})

ipcMain.on('toggle-stay-on-top', toggleStayOnTop)

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the dock icon is
  // clicked and there are no other windows open.
  if (!BrowserWindow.getAllWindows().length) {
    createWindow()
  } else {
    win?.show()
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

config.onDidChange(ConfigKey.StayOnTop, (value) => {
  win.setAlwaysOnTop(!!value)
  win.webContents.send('set-stay-on-top', !!value)
})
