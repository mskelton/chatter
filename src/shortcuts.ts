export class Shortcuts {
  #registrations = new Map<string, () => void>()

  register(key: string, callback: () => void) {
    this.#registrations.set(key, callback)
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
