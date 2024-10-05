import type { Application } from 'pixi.js'
import { Assets, Container, Graphics, Point, Sprite } from 'pixi.js'

async function preload() {
  const assets = [
    { alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
  ]
  await Assets.load(assets)
}

const bubbles: Bubble[] = []
let mousedown = false

let displacementSprite: Sprite

function displacement() {
  // displacementSprite = Sprite.from('https://res.cloudinary.com/dvxikybyi/image/upload/v1486634113/2yYayZk_vqsyzx.png')
  // displacementSprite.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT
  // displacementFilter = new filters.DisplacementFilter(displacementSprite)
  // displacementFilter.padding = 0

  // displacementSprite.position = container.position

  // app.stage.addChild(displacementSprite)

  // container.filters = [displacementFilter]

  // displacementFilter.scale.x = 50
  // displacementFilter.scale.y = 50
}

class Bubble {
  sprite: Sprite
  position: Point
  velocity: Point
  acceleration: Point
  pressure: Point
  waterResistance: Point
  scale: number
  mass: number

  constructor(args) {
    if (args === undefined)
      args = {}
    this.sprite = Sprite.from('https://res.cloudinary.com/losrodriguez/image/upload/v1566328006/black_bubble_g9jolh.png')
    this.position = new Point(args.x, args.y)
    this.init()
  }

  init() {
    this.velocity = new Point(Math.random() * 0.1 - 0.05, -0.01)
    this.acceleration = new Point(Math.random() * 0.01 - 0.05, -0.01)
    this.pressure = new Point(Math.random() * 0.1 - 0.05, -0.1)
    this.waterResistance = new Point(Math.random() * 0.1 - 0.05, -0.1)
    this.scale = Math.random() * 0.5
    this.mass = Math.random() * 0.1
    this.sprite.rotation = Math.random() * Math.PI
    this.draw()
  }

  draw(_graphics?: Graphics) {
    this.update()
    this.sprite.x = this.position.x
    this.sprite.y = this.position.y
    this.sprite.scale.set(this.scale)
  }

  applyForce(_force) {
    const f = _force.mult(this.mass)
    this.acceleration.add(f)
  }

  update() {
    this.applyForce(this.pressure)
    this.applyForce(this.waterResistance)
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.multiply(new Point(0, 0))
    this.scale -= 0.005
  }

  isDead() {
    return (this.scale < 0.0)
  }
}

export async function createExample(app: Application) {
  await preload()

  const background = Sprite.from('background')
  background.anchor.set(0.5)
  background.scale.set(2)
  app.stage.addChild(background)

  const container = new Container()
  const graphics = new Graphics()

  function addEvents() {
    document.addEventListener('mousedown', (_e) => {
      mousedown = true
    })
    document.addEventListener('mouseup', (_e) => {
      mousedown = false
    })
    document.addEventListener('mousemove', (e) => {
      if (!mousedown)
        return false
      const bubble = new Bubble({
        x: e.clientX,
        y: e.clientY,
      })
      container.addChild(bubble.sprite)
      bubbles.push(bubble)
    }, false)
  }

  function removeBubble(_bubble) {
    const index = bubbles.indexOf(_bubble)
    bubbles.splice(index, 1)
    container.removeChildren(index, index + 1)
  }

  function render() {
    for (let i = 0; i < bubbles.length; i++) {
      const bubble = bubbles[i]
      if (bubble.isDead())
        removeBubble(bubble)
      else bubble.draw(graphics)
    }
    displacementSprite.x++
    if (displacementSprite.x > displacementSprite.width)
      displacementSprite.x = 0
  }

  function animate() {
    requestAnimationFrame(animate)
    render()
  }

  for (let i = 0; i < 300; i++) {
    const bubble = new Bubble({
      x: Math.random() * app.screen.width,
      y: Math.random() * app.screen.height,
    })
    container.addChild(bubble.sprite)
    bubbles.push(bubble)
  }
  displacement()
  addEvents()

  return {
    animate,
  }
}

export default createExample
