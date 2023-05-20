export function restart() {
  let config

  return {
    closeBundle() {
      if (config.mode === "production") {
        return
      }

      process.stdin.emit("data", "rs")
    },
    configResolved(_config) {
      config = _config
    },
    name: "electron-restart",
  }
}
