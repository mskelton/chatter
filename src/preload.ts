import { ipcRenderer as ipc } from 'electron'
import { iconPin, iconPinFilled } from './icons'
import { Shortcuts } from './shortcuts'

const selectors = {
  header: '.sticky.border-b',
}

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
  click(document.querySelector(`${selectors.header} > button:last-of-type`))
})

shortcuts.register('s', () => {
  click(document.querySelector(`${selectors.header} > button:first-of-type`))
})

shortcuts.register('k', () => {
  const selector = 'button[aria-haspopup="menu"]:has(> .text-gray-500)'
  click(document.querySelector(selector))
})

shortcuts.listen()

// Focus the prompt when pressing /
document.addEventListener('keydown', (event: KeyboardEvent) => {
  const el = event.target as HTMLElement

  if (
    event.key === '/' &&
    el.tagName !== 'INPUT' &&
    el.tagName !== 'TEXTAREA'
  ) {
    event.preventDefault()
    document.getElementById('prompt-textarea')?.focus()
  }
})

ipc.on('startup', (_, isPinned: boolean) => {
  const button = document.createElement('button')

  // Set initial state
  button.innerHTML = isPinned ? iconPinFilled : iconPin
  button.dataset.pinned = isPinned.toString()

  // Add the pin button to the header
  const el = document.querySelector(`${selectors.header} > button:last-of-type`)
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
