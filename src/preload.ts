import { ipcRenderer as ipc } from 'electron'
import { iconPin, iconPinFilled } from './icons'
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
    click(document.querySelector('[data-testid="send-button"]'))
  }
})

const shortcuts = new Shortcuts()

shortcuts.register(['n', 't'], () => {
  click(document.querySelector('.sticky.border-b > button:last-of-type'))
})

shortcuts.register('s', () => {
  // click(document.querySelector('.sticky.border-b > button:last-of-type'))
})

shortcuts.listen()

ipc.on('startup', (_, isPinned: boolean) => {
  const button = document.createElement('button')

  // Set initial state
  button.innerHTML = isPinned ? iconPinFilled : iconPin
  button.dataset.pinned = isPinned.toString()

  // Add the pin button to the header
  const el = document.querySelector('.sticky.border-b > button:last-of-type')
  el?.parentNode?.insertBefore(button, el)

  function setPinned(value: boolean) {
    button.innerHTML = value ? iconPinFilled : iconPin
    button.dataset.pinned = value.toString()
  }

  // Toggle pinned state when the button is clicked
  button.addEventListener('click', () => {
    setPinned(button.dataset.pinned !== 'true')
    ipc.send('toggle-pinned')
  })

  // Update the state when the config changes from the main process
  ipc.on('set-pinned', (_, value: boolean) => {
    setPinned(value)
  })
})
