import BaseScene from "./base-scene"
import TitleScene from "./scene-title"
import BaseImage from "../image/base-image"

export default class EndScene extends BaseScene {
  constructor(game) {
    super(game)
    game.registerAction("r", () => {
      const titleScene = new TitleScene(game)
      game.replaceScene(titleScene)
    })
    this.setup()
  }

  setup() {
    this.bg = new BaseImage(this.game, "bg")
    this.title = new BaseImage(this.game, "titleEnd")
    this.bg.w = 600
    this.bg.h = 400
    this.title.x = 150
    this.title.y = 50
    this.title.w = 300
    this.title.h = 150
    this.addElements(this.bg)
    this.addElements(this.title)
  }

  draw() {
    super.draw()
    // 设置文本大小 + 字体
    this.game.context.font = "10pt Georgia"
    this.game.context.fillStyle = "white"
    this.game.context.fillText("按 R 返回标题页面", 250, 250, 100)
  }
}
