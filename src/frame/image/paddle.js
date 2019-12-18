import BaseImage from "./base-image"

export default class Paddle extends BaseImage {
  constructor(game) {
    super(game, "paddle")
    this.setup()
  }

  setup() {
    this.speed = 10
    this.x = 150
    this.y = 300
  }

  move() {
    if (this.x < 0) {
      this.x = 0
    }
    if (this.x > 400 + this.w * 2) {
      this.x = 400 + this.w * 2
    }
  }

  moveLeft() {
    // @ts-ignore
    this.move((this.x -= this.speed))
  }

  moveRight() {
    // @ts-ignore
    this.move((this.x += this.speed))
  }
}
