import BaseScene from "./base-scene"
import Scene from "./scene"
import BaseImage from "../image/base-image"

export default class TitleScene extends BaseScene {
  constructor(game) {
    super(game)
    game.registerAction("Enter", () => {
      const scene = new Scene(game)
      game.replaceScene(scene)
    })
    this.setup()
  }

  setup() {
    this.bg = new BaseImage(this.game, "bg")
    this.title = new BaseImage(this.game, "titleBegin")
    this.bg.w = 600
    this.bg.h = 400
    this.title.x = 100
    this.title.y = 50
    this.title.w = 400
    this.title.h = 200
    this.addElements(this.bg)
    this.addElements(this.title)
  }

  draw() {
    super.draw()
    // 设置文本大小 + 字体
    this.game.context.font = "small-caps bold 20pt arial"

    this.game.context.fillStyle = "white"
    this.game.context.fillText("按 Enter 开始游戏", 270, 250, 300)
  }
}
