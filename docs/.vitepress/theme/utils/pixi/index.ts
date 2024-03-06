import { Application } from 'pixi.js'

export async function initPixiApp(canvas: HTMLCanvasElement) {
  const app = new Application()
  await app.init({
    canvas,
    background: '#1099BB',
    resizeTo: window,
  })
  return app
}
