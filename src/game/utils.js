export const e = selector => document.querySelector(selector)

export const imgFromPath = function(path, loadCallback) {
  const img = new Image()
  img.addEventListener("load", loadCallback)
  img.src = path
  return img
}

export const randomBetween = function(start, end) {
  const m = Math.random() * (end - start + 1)
  return Math.floor(m + start)
}

export const rectIntersects = function(a, b) {
  if (b.y > a.y - a.h && b.y < a.y + a.h) {
    if (b.x > a.x && b.x < a.x + a.w) {
      return true
    }
  }
  return false
}
