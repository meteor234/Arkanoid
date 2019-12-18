import BaseImage from "./base-image"
import { randomBetween } from "../../game/utils"

export default class Block extends BaseImage {
  constructor(game, position) {
    super(game, "block")
    // eslint-disable-next-line prefer-destructuring
    this.x = position[0]

    // eslint-disable-next-line prefer-destructuring
    this.y = position[1]
    this.setup()
  }

  setup() {
    this.lives = randomBetween(1, 3)
    // this.life = true
  }
}
