// import type { Application } from 'pixi.js'
// import { Assets, Sprite } from 'pixi.js'

// async function preload() {
//   const assets = [
//     { alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
//   ]
//   await Assets.load(assets)
// }

// function addEvents() {
//   document.addEventListener('mousedown', (e) => {
//     mousedown = true
//   })
//   document.addEventListener('mouseup', (e) => {
//     mousedown = false
//   })
//   document.addEventListener('mousemove', (e) => {
//     if (!mousedown)
//       return false
//     const bubble = new Bubble({
//       x: e.clientX,
//       y: e.clientY,
//     })
//     container.addChild(bubble.sprite)
//     bubbles.push(bubble)
//   }, false)
// }

// function displacement() {
//   displacementSprite = PIXI.Sprite.from('https://res.cloudinary.com/dvxikybyi/image/upload/v1486634113/2yYayZk_vqsyzx.png')
//   displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
//   displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)
//   displacementFilter.padding = 0

//   displacementSprite.position = container.position

//   app.stage.addChild(displacementSprite)

//   container.filters = [displacementFilter]

//   displacementFilter.scale.x = 50
//   displacementFilter.scale.y = 50
// }

// function animate() {
//   requestAnimationFrame(animate)
//   render()
// }

// function removeBubble(_bubble) {
//   const index = bubbles.indexOf(_bubble)
//   bubbles.splice(index, 1)
//   container.removeChildren(index, index + 1)
// }

// function render() {
//   for (let i = 0; i < bubbles.length; i++) {
//     const bubble = bubbles[i]
//     if (bubble.isDead())
//       removeBubble(bubble)
//     else bubble.draw(graphics)
//   }
//   displacementSprite.x++
//   if (displacementSprite.x > displacementSprite.width)
//     displacementSprite.x = 0
// }

// var Bubble = function (args) {
//   if (args === undefined)
//     args = {}
//   this.sprite = PIXI.Sprite.from('https://res.cloudinary.com/losrodriguez/image/upload/v1566328006/black_bubble_g9jolh.png')
//   this.position = new Vector(args.x, args.y)
//   this.init = function () {
//     this.velocity = new Vector(Math.random() * 0.1 - 0.05, -0.01)
//     this.acceleration = new Vector(Math.random() * 0.01 - 0.05, -0.01)
//     this.pressure = new Vector(Math.random() * 0.1 - 0.05, -0.1)
//     this.waterResistance = new Vector(Math.random() * 0.1 - 0.05, -0.1)
//     this.scale = Math.random() * 0.5
//     this.mass = Math.random() * 0.1
//     this.sprite.rotation = Math.random() * Math.PI
//     this.draw()
//   }
//   this.draw = function (_graphics) {
//     this.update()
//     this.sprite.x = this.position.x
//     this.sprite.y = this.position.y
//     this.sprite.scale.set(this.scale)
//   }
//   this.applyForce = function (_force) {
//     const f = _force.mult(this.mass)
//     this.acceleration.addTo(f)
//   }
//   this.update = function () {
//     this.applyForce(this.pressure)
//     this.applyForce(this.waterResistance)
//     this.velocity.addTo(this.acceleration)
//     this.position.addTo(this.velocity)
//     this.acceleration.mult(0)
//     this.scale -= 0.005
//   }
//   this.isDead = function () {
//     return (this.scale < 0.0)
//   }
//   this.init()
//   return this
// }

// export async function createExample(app: Application) {
//   await preload()

//   const background = Sprite.from('background')
//   background.anchor.set(0.5)
//   background.scale.set(2)
//   app.stage.addChild(background)

//   for (let i = 0; i < 300; i++) {
//     const bubble = new Bubble({
//       x: Math.random() * app.screen.width,
//       y: Math.random() * app.screen.height,
//     })
//     container.addChild(bubble.sprite)
//     bubbles.push(bubble)
//   }
//   displacement()
//   addEvents()
// }

// export default createExample
