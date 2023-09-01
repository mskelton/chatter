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
