import ready from "element-ready"

const readyOpts = { stopOnDomReady: false }

ready("#prompt-textarea", readyOpts).then((element: HTMLElement) => {
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.metaKey && !event.shiftKey) {
      event.preventDefault()
      ;(element.nextSibling as HTMLElement | undefined)?.click()
    }
  })
})
