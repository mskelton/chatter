import { ipcRenderer } from 'electron'
import { Shortcuts } from './shortcuts'

function click(element: Node | null) {
  ;(element as HTMLElement)?.click()
}

// Use same shortcut for submit no matter the screen size
document.addEventListener('keydown', (event) => {
  const node = event.target as HTMLElement

  if (
    node.id === 'prompt-textarea' &&
    event.key === 'Enter' &&
    !event.metaKey &&
    !event.shiftKey
  ) {
    event.preventDefault()
    click(node.nextSibling)
  }
})

const shortcuts = new Shortcuts()

shortcuts.register('n', () => {
  click(document.querySelector('.sticky > button:last-of-type'))
})

shortcuts.register('j', () => {
  ipcRenderer.send('stay-on-top')
})

shortcuts.listen()
