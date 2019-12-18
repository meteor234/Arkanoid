const pauseGameWithKeys = pauseKeys => {
  window.addEventListener("keydown", function(event) {
    const { key } = event
    if (pauseKeys.includes(key)) {
      window.paused = !window.paused
    }
  })
}

const enableDebugMode = function(enable) {
  if (!enable) {
    return
  }
  const pauseKeys = ["p"]
  pauseGameWithKeys(pauseKeys)
}

export default enableDebugMode
