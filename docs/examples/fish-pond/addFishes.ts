import type { Application, Ticker } from 'pixi.js'
import { Container, Sprite } from 'pixi.js'

export type Fish = Sprite & {
  direction: number
  speed: number
  turnSpeed: number
}

export function addFishes(app: Application, fishes: Fish[]) {
  const fishContainer = new Container()
  const fishCount = 20
  const fishAssets = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5']

  for (let i = 0; i < fishCount; i++) {
    const fishAsset = fishAssets[i % fishAssets.length]
    const fish = Sprite.from(fishAsset) as Fish

    fish.anchor.set(0.5)
    fish.direction = Math.random() * Math.PI * 2
    fish.speed = 2 + Math.random() * 2
    fish.turnSpeed = Math.random() - 0.8

    fish.x = Math.random() * app.screen.width
    fish.y = Math.random() * app.screen.height
    fish.scale.set(0.5 + Math.random() * 0.2)

    fishContainer.addChild(fish)
    fishes.push(fish)
  }

  app.stage.addChild(fishContainer)
}

export function animateFishes(app: Application, fishes: Fish[], _time: Ticker) {
  // const delta = time.deltaTime

  const stagePadding = 100
  const boundWidth = app.screen.width + stagePadding * 2
  const boundHeight = app.screen.height + stagePadding * 2

  fishes.forEach((fish) => {
    fish.direction += fish.turnSpeed * 0.01
    fish.x += Math.sin(fish.direction) * fish.speed
    fish.y += Math.cos(fish.direction) * fish.speed
    fish.rotation = -fish.direction - Math.PI / 2

    if (fish.x < -stagePadding)
      fish.x += boundWidth

    if (fish.x > app.screen.width + stagePadding)
      fish.x -= boundWidth

    if (fish.y < -stagePadding)
      fish.y += boundHeight

    if (fish.y > app.screen.height + stagePadding)
      fish.y -= boundHeight
  })
}
