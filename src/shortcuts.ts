export class Shortcuts {
  #registrations = new Map<string, () => void>()

  register(keys: string | string[], callback: () => void) {
    ;(Array.isArray(keys) ? keys : [keys]).forEach((key) => {
      this.#registrations.set(key, callback)
    })
  }

  listen() {
    document.addEventListener('keydown', (event) => {
      if (!event.metaKey) return
      const callback = this.#registrations.get(event.key)

      if (callback) {
        event.preventDefault()
        callback()
      }
    })
  }
}
