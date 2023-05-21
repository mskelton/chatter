import { ipcRenderer } from 'electron'
import ready from 'element-ready'
import { Shortcuts } from './shortcuts.js'

function click(element: Node | null) {
  ;(element as HTMLElement)?.click()
}

const readyOpts = { stopOnDomReady: false }

// Use same shortcut for submit no matter the screen size
ready('#prompt-textarea', readyOpts).then((element) => {
  element?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.metaKey && !event.shiftKey) {
      event.preventDefault()
      click(element.nextSibling)
    }
  })
})

const shortcuts = new Shortcuts()

shortcuts.register('n', () => {
  click(document.querySelector('.sticky > button:last-of-type'))
})

shortcuts.register('j', () => {
  ipcRenderer.send('keep-on-top')
})

shortcuts.listen()
