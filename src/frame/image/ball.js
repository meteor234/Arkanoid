import BaseImage from "./base-image"

export default class Ball extends BaseImage {
  constructor(game) {
    super(game, "ball")
    this.setup()
  }

  setup() {
    this.speed_x = 5
    this.speed_y = 5
    this.x = 150
    this.y = 270
    this.fired = false
    this.live = true
  }

  move() {
    if (this.fired) {
      if (this.x < 0 || this.x > 600 - this.w) {
        this.speed_x *= -1
      }
      if (this.y < 0) {
        this.speed_y *= -1
      }
      if (this.y > 400 - this.h) {
        this.live = false
      }
      this.x += this.speed_x
      this.y += this.speed_y
    }
  }

  fire() {
    this.fired = true
  }

  rebound() {
    this.speed_y *= -1
  }

  hasPoint(x, y) {
    const xIn = x >= this.x && x <= this.x + this.w
    const yIn = y >= this.y && y <= this.y + this.h
    return xIn && yIn
  }
}
