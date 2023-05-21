import { autoUpdater } from "electron"

export async function checkForUpdates() {
  autoUpdater.checkForUpdates()
}
