import {
  app,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  shell,
} from 'electron'
import { is } from 'electron-util'
import config, { ConfigKey } from './config'

const repoURL = 'https://github.com/mskelton/chatter'

export function initMenu() {
  const menu: MenuItemConstructorOptions[] = [
    {
      label: app.name,
      submenu: [
        {
          label: `About ${app.name}`,
          role: 'about',
        },
        {
          type: 'separator',
        },
        {
          accelerator: 'CommandOrControl+H',
          label: `Hide ${app.name}`,
          role: 'hide',
        },
        {
          accelerator: 'CommandOrControl+Shift+H',
          label: 'Hide Others',
          role: 'hideOthers',
        },
        {
          label: 'Show All',
          role: 'unhide',
        },
        {
          type: 'separator',
        },
        {
          accelerator: 'CommandOrControl+Q',
          click: () => app.quit(),
          label: `Quit ${app.name}`,
        },
      ],
    },
    {
      label: 'Settings',
      submenu: [
        {
          checked: config.get(ConfigKey.Pinned),
          click({ checked }) {
            config.set(ConfigKey.Pinned, checked)
          },
          id: 'pinned',
          label: 'Stay On Top',
          type: 'checkbox',
        },
      ],
    },
    {
      role: 'editMenu',
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          accelerator: 'CommandOrControl+M',
          label: 'Minimize',
          role: 'minimize',
        },
        {
          accelerator: 'CommandOrControl+W',
          label: 'Close',
          role: 'close',
        },
      ],
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          click: () => shell.openExternal(repoURL),
          label: `${app.name} Website`,
        },
        {
          click: () => shell.openExternal(`${repoURL}/issues/new`),
          label: 'Report an Issue',
        },
      ],
    },
  ]

  // Add the develop menu when running in the development environment
  if (is.development) {
    menu.push({
      label: 'Develop',
      submenu: [
        {
          click() {
            config.clear()
            app.relaunch()
            app.exit(0)
          },
          label: 'Clear Cache and Restart',
        },
        {
          label: 'Developer Tools',
          role: 'toggleDevTools',
        },
      ],
    })
  }

  const appMenu = Menu.buildFromTemplate(menu)

  function setItem(id: string, cb: (item: MenuItem) => void) {
    const item = appMenu.getMenuItemById(id)
    if (item) cb(item)
  }

  config.onDidChange(ConfigKey.Pinned, (value) => {
    setItem('pinned', (item) => (item.checked = !!value))
  })

  Menu.setApplicationMenu(appMenu)
}
