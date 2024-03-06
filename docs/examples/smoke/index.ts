import type { Application } from 'pixi.js'
import { Assets, Container, Sprite, Texture } from 'pixi.js'

async function preload() {
  const assets = [
    { alias: 'smoke-element', src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png' },
  ]
  await Assets.load(assets)
}

export async function createSmoke(app: Application) {
  await preload()
  const smokes = new Container()
  app.stage.addChild(smokes)

  const smokeTexture = Texture.from('smoke-element')
  const smokeParticles: Sprite[] = []

  for (let p = 0; p < 100; p++) {
    const particle = new Sprite(smokeTexture)
    particle.position.set(
      (window.innerWidth / 2) - (Math.random() * 500 - 250),
      (window.innerHeight / 2) - (Math.random() * 500 - 250),
    )
    particle.anchor.set(0.5)
    particle.rotation = Math.random() * 360
    particle.alpha = 0.5
    particle.blendMode = 'screen'
    particle.tint = 0xFFFFFF
    // @ts-expect-error _speed is custom property
    particle._speed = (r(0, 100) - 50) / 10000
    smokes.addChild(particle)
    smokeParticles.push(particle)
  }

  app.ticker.speed = 0.5
  app.ticker.add((ticker) => {
    animate(ticker.deltaTime)
  })

  function animate(delta: number) {
    let sp = smokeParticles.length
    while (sp--) {
      // @ts-expect-error _speed is custom property
      const x = smokeParticles[sp]._speed
      smokeParticles[sp].rotation += (delta * x)
    }
  }

  function r(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + 1) + min
  }
}

export default createSmoke
