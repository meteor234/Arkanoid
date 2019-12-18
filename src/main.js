import { TitleScene } from "./frame/scene"
import Game from "./game/game"
import enableDebugMode from "./debug"

import ball from "./image/ball.png"
import block from "./image/block.png"
import paddle from "./image/paddle.png"
import bg from "./image/background.png"
import titleBegin from "./image/title-begin.png"
import titleEnd from "./image/title-end.png"

const startGame = () => {
  window.paused = false

  const imagePathsDict = {
    ball,
    block,
    paddle,
    bg,
    titleBegin,
    titleEnd,
  }

  const game = new Game({
    fps: 30,
    imagePathsDict,
    callback(g) {
      const titleScene = new TitleScene(g)
      // @ts-ignore
      g.runWithScene(titleScene)
    },
  })

  game.start()
}

const __main = function() {
  startGame()
  enableDebugMode(true)
}

__main()
