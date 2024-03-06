import type { Application } from 'pixi.js'
import { Assets, Sprite } from 'pixi.js'

async function preload() {
  const assets = [
    { alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
  ]
  await Assets.load(assets)
}

export async function createExample(app: Application) {
  await preload()

  const background = Sprite.from('background')
  background.anchor.set(0.5)
  background.scale.set(2)
  app.stage.addChild(background)
}

export default createExample
