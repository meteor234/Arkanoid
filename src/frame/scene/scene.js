import BaseScene from "./base-scene"
import EndScene from "./scene-end"

import { Block, Paddle, Ball, BaseImage } from "../image"

import levels from "../../levels"

export default class Scene extends BaseScene {
  constructor(game) {
    super(game)
    this.score = 0
    this.level = 0
    this.setup()
    this.setupInputs()
    this.edit()
  }

  setup() {
    this.bg = new BaseImage(this.game, "bg")
    this.bg.w = 600
    this.bg.h = 400
    this.paddle = new Paddle(this.game)
    this.ball = new Ball(this.game)
    this.addElements(this.bg)
    this.addElements(this.paddle)
    this.addElements(this.ball)
    this.addEnemies()
  }

  addEnemies() {
    // 点击页面添加砖块
    if (this.level >= levels.length) {
      return
    }
    const bs = []

    levels[this.level].forEach(i => {
      const b = new Block(this.game, i)
      bs.push(b)
      this.addElements(b)
    })

    this.blocks = bs
  }

  setupInputs() {
    this.game.registerAction("a", () => {
      this.paddle.moveLeft()
    })
    this.game.registerAction("d", () => {
      this.paddle.moveRight()
    })
    this.game.registerAction(" ", () => {
      this.ball.fire()
    })
  }

  edit() {
    // 移动小球
    let enableDrag = false
    const { ball } = this
    const { canvas } = this.game
    canvas.addEventListener("mousedown", function(event) {
      const x = event.offsetX
      const y = event.offsetY
      if (ball.hasPoint(x, y)) {
        enableDrag = true
      }
    })

    canvas.addEventListener("mousemove", function(event) {
      const x = event.offsetX
      const y = event.offsetY
      if (enableDrag) {
        ball.x = x
        ball.y = y
      }
    })

    // canvas.addEventListener("mouseup", function(event) {
    //   const x = event.offsetX
    //   const y = event.offsetY
    //   enableDrag = false
    // })

    canvas.addEventListener("click", e => {
      const x = e.pageX - canvas.getBoundingClientRect().left
      const y = e.pageY - canvas.getBoundingClientRect().top
      const block = new Block(this.game, [x, y])
      this.blocks.push(block)
      this.addElements(block)
    })
  }

  draw() {
    super.draw()
    const { context } = this.game
    context.font = "18pt Georgia"
    context.fillStyle = "white"
    context.fillText(`score: ${this.score}`, 5, 20, 200)
  }

  update() {
    super.update()
    // 按 p 暂停
    if (window.paused) {
      return
    }

    this.ball.move()
    const existBlocks = this.blocks.filter(b => b.lives > 0)

    // 小球和挡板碰撞
    if (this.ball.collide(this.paddle)) {
      this.ball.rebound()
    }

    // 小球和砖块碰撞
    existBlocks.forEach(b => {
      if (b.collide(this.ball)) {
        b.lives -= 1
        this.ball.rebound()
        if (b.lives === 0) {
          this.removeElements(b)
        }
        this.score += 100
      }
    })

    // 砖块打完进入下一关
    if (existBlocks.length === 0) {
      this.level++
      this.addEnemies()
    }

    // 小球掉落或关卡打完游戏结束
    if (this.ball.live === false || levels[this.level] === undefined) {
      const s = new EndScene(this.game)
      this.game.replaceScene(s)
    }
  }
}
