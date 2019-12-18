export default class BaseScene {
  constructor(game) {
    this.game = game
    this.elements = []
    this.draw()
  }

  addElements(img) {
    img.scene = this
    this.elements.push(img)
  }

  removeElements(img) {
    img.scene = this

    this.elements.forEach((element, i) => {
      if (element === img) {
        this.elements.splice(i, 1)
      }
    })
  }

  draw() {
    this.elements.forEach(e => {
      e.draw()
    })
  }

  update() {
    this.elements.forEach(e => {
      e.update()
    })
  }
}
