/**
 * @see https://codepen.io/juliangarnier/pen/gmOwJX
 * inherited from hexo-theme-yun
 * customized by valaxy-theme-yun
 * @author YunYouJun
 */

import type { JSAnimation } from 'animejs'

import type { FireworksConfig, Particle, Point } from './types'
import { TinyColor } from '@ctrl/tinycolor'
import { animate, createTimeline, utils } from 'animejs'

/**
 * update pointer
 * clientX not work in iOS
 */
export function getCoordsFromEvent(e: MouseEvent | TouchEvent): Point {
  const pointerX
    = 'clientX' in e
      ? e.clientX
      : (e.touches[0] ? e.touches[0].clientX : e.changedTouches[0].clientX)
  const pointerY
    = 'clientY' in e
      ? e.clientY
      : (e.touches[0] ? e.touches[0].clientY : e.changedTouches[0].clientY)

  return {
    x: pointerX,
    y: pointerY,
  }
}

/**
 * 设置画布尺寸
 * @default
 */
export function setCanvasSize(canvasEl: HTMLCanvasElement, width = window.innerWidth, height = window.innerHeight) {
  canvasEl.width = width
  canvasEl.height = height
  canvasEl.style.width = `${width}px`
  canvasEl.style.height = `${height}px`
}

/**
 * 创建烟花
 * @param config
 */
export function createFireworks(config: Partial<FireworksConfig>) {
  const {
    selector = 'canvas.fireworks',
    // sky blue
    numberOfParticles = 20,
    circleRadius = {
      min: 10,
      max: 20,
    },
    diffuseRadius = {
      min: 50,
      max: 100,
    },
    orbitRadius = {
      min: 50,
      max: 100,
    },
    animeDuration = {
      min: 900,
      max: 1500,
    },
  } = config

  const colors = (config.colors && config.colors.length > 0)
    ? config.colors
    : ['#66A7DD', '#3E83E1', '#214EC2']

  const canvasEl = document.querySelector(selector) as HTMLCanvasElement
  const ctx = canvasEl.getContext('2d')

  if (!ctx)
    return

  function setParticleDirection(p: Point) {
    const angle = (utils.random(0, 360) * Math.PI) / 180
    const value = utils.random(
      diffuseRadius.min,
      diffuseRadius.max,
    )
    const radius = value * utils.randomPick([-1, 1])
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle),
    }
  }

  /**
   * 在指定位置创建粒子
   * @param {number} x
   * @param {number} y
   */
  function createParticle(x: number, y: number) {
    const tinyColor = new TinyColor(utils.randomPick(colors))
    tinyColor.setAlpha(utils.random(0.2, 0.8, 2))

    const p: Particle = {
      x,
      y,
      color: tinyColor.toRgbString(),
      radius: utils.random(circleRadius.min, circleRadius.max),
      endPos: setParticleDirection({ x, y }),
      draw: () => {},
    }

    p.draw = function () {
      if (!ctx)
        return

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
      ctx.fillStyle = p.color
      ctx.fill()
    }
    return p
  }

  interface Circle {
    draw: () => void
  }

  function createCircle(x: number, y: number) {
    const p = {
      x,
      y,
      color: '#000',
      radius: 0.1,
      alpha: 0.5,
      lineWidth: 6,
      draw() {},
    }

    p.draw = () => {
      if (!ctx)
        return

      ctx.globalAlpha = p.alpha
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true)
      ctx.lineWidth = p.lineWidth
      ctx.strokeStyle = p.color
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    return p
  }

  function renderParticle(anim: JSAnimation) {
    // anim.draw()
    // console.log('anim', anim)
    for (const target of anim.targets) {
      target.draw()
    }
  }

  function animateParticles(pos: Point) {
    const { x, y } = pos
    const circle = createCircle(x, y)
    const particles = []
    for (let i = 0; i < numberOfParticles; i++)
      particles.push(createParticle(x, y))

    const timeline = createTimeline({})
    timeline
      .add(particles, {
        x: (target: any) => {
          return (target as Particle).endPos.x
        },
        y: (target: any) => {
          return (target as Particle).endPos.y
        },
        radius: 0.1,
        duration: utils.random(
          animeDuration.min,
          animeDuration.max,
        ),
        ease: 'outExpo',
        onUpdate: renderParticle,
      })
      .add(circle, {
        radius: utils.random(orbitRadius.min, orbitRadius.max),
        lineWidth: 0,
        alpha: {
          to: 0,
          ease: 'linear',
          duration: utils.random(600, 800),
        },
        duration: utils.random(1200, 1800),
        ease: 'outExpo',
        onUpdate: (anim: JSAnimation) => {
          (anim.targets[0] as Circle).draw()
        },
      }, 0)
  }

  document.addEventListener(
    'mousedown',
    (e) => {
      animate({ n: 0 }, {
        n: 1,
        duration: 2000,
        onUpdate() {
          ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height)
        },
      })

      const pos = getCoordsFromEvent(e)
      // for ios relative
      const rect = canvasEl.getBoundingClientRect()
      animateParticles({
        x: pos.x - rect.left,
        y: pos.y - rect.top,
      })
    },
    false,
  )

  setCanvasSize(canvasEl)
  window.addEventListener(
    'resize',
    () => {
      setCanvasSize(canvasEl)
    },
    false,
  )
}
