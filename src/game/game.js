import { e as $, imgFromPath } from "./utils"

export default class Game {
  constructor({ fps, imagePathsDict, callback }) {
    window.fps = fps
    /* @private  */
    this._imagePathsDict = imagePathsDict
    this._images = {}
    this._callback = callback
    this._actions = {}
    this._keydowns = {}
    this._scene = undefined

    // @public
    this.canvas = $("#myCanvas")

    // set the canvas size and layout
    this.canvas.classList.add("game-size", "game-layout")
    this.context = this.canvas.getContext("2d")

    this._setupActionDetection()
  }

  _setupActionDetection() {
    const setKeyDownState = event => {
      this._keydowns[event.key] = true
    }
    const setKeyUpState = event => {
      this._keydowns[event.key] = false
    }

    window.addEventListener("keydown", setKeyDownState)

    window.addEventListener("keyup", setKeyUpState)
  }

  _draw() {
    this._scene.draw()
  }

  _update() {
    this._scene.update()
  }

  drawImage(image) {
    this.context.drawImage(image.texture, image.x, image.y, image.w, image.h)
  }

  _run() {
    this._callback(this)
  }

  _loadAllImages(runAfterLoadAllImages) {
    const { _imagePathsDict: imagePathsDict } = this

    const imageNames = Object.keys(imagePathsDict)
    runAfterLoadAllImages = runAfterLoadAllImages.bind(null, imageNames)

    imageNames.forEach(imageName => {
      const imagePath = imagePathsDict[imageName]

      const img = imgFromPath(imagePath, runAfterLoadAllImages)

      this._images[imageName] = img
    })
  }

  start() {
    const loadedImgNums = []
    const runAfterLoadAllImages = imageNames => {
      // this.images[name] = img
      loadedImgNums.push(1)
      if (loadedImgNums.length === imageNames.length) {
        this._run()
      }
    }

    this._loadAllImages(runAfterLoadAllImages)
  }

  _runLoop() {
    const actionkeys = Object.keys(this._actions)
    actionkeys.forEach(key => {
      if (this._keydowns[key]) {
        this._actions[key]()
      }
    })

    // update
    this._update()

    // clear
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // draw
    this._draw()
    // next run loop
    setTimeout(() => {
      this._runLoop()
    }, 1000 / window.fps)
  }

  registerAction(key, callback) {
    this._actions[key] = callback
  }

  textureByName(name) {
    const image = this._images[name]

    return image
  }

  replaceScene(scene) {
    this._scene = scene
  }

  runWithScene(scene) {
    this.replaceScene(scene)

    setTimeout(() => {
      this._runLoop()
    }, 1000 / window.fps)
  }
}
