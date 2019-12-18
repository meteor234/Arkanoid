import { rectIntersects } from "../../game/utils"

export default class BaseImage {
  constructor(game, name) {
    this.game = game
    this.texture = game.textureByName(name)

    this.x = 0
    this.y = 0
    this.w = this.texture.width
    this.h = this.texture.height
  }

  /* eslint-disable  class-methods-use-this */
  update() {}

  draw() {
    this.game.drawImage(this)
  }

  collide(b) {
    return rectIntersects(this, b) || rectIntersects(b, this)
  }
}
