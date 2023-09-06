import { ipcRenderer as ipc } from 'electron'
import { pinIcon, pinIconFilled } from './icons'
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

shortcuts.listen()

ipc.on('startup', (_, isPinned: boolean) => {
  const button = document.createElement('button')

  // Set initial state
  button.innerHTML = isPinned ? pinIconFilled : pinIcon
  button.dataset.pinned = isPinned.toString()

  // Add the pin button to the header
  const el = document.querySelector('.sticky.border-b > button:last-of-type')
  el?.parentNode?.insertBefore(button, el)

  function setStayOnTop(value: boolean) {
    button.innerHTML = value ? pinIconFilled : pinIcon
    button.dataset.pinned = value.toString()
  }

  // Toggle stay on top when the button is clicked
  button.addEventListener('click', () => {
    setStayOnTop(button.dataset.pinned !== 'true')
    ipc.send('toggle-stay-on-top')
  })

  // Update the state when the config changes from the main process
  ipc.on('set-stay-on-top', (_, value: boolean) => {
    setStayOnTop(value)
  })
})
