export function randomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const colors = ['#FC4F4F', '#FFBC80', '#FF9F45', '#F76E11']
// const shapes = ['square', 'circle', 'triangle', 'heart']
export const shapes = ['heart']

export class Particle {
  x: number
  y: number
  rotation: number
  shape: string
  color: string
  size: number
  duration: number
  parent: HTMLElement
  children: HTMLElement

  constructor({ x, y, rotation, shape, color, size, duration, parent }: {
    x: number
    y: number
    rotation: number
    shape: string
    color: string
    size: number
    duration: number
    parent: HTMLElement
  }) {
    this.x = x
    this.y = y
    this.parent = parent
    this.rotation = rotation
    this.shape = shape
    this.color = color
    this.size = size
    this.duration = duration
    this.children = document.createElement('div')
  }

  draw() {
    this.children.style.setProperty('--x', `${this.x}px`)
    this.children.style.setProperty('--y', `${this.y}px`)
    this.children.style.setProperty('--r', `${this.rotation}deg`)
    this.children.style.setProperty('--c', this.color)
    this.children.style.setProperty('--size', `${this.size}px`)
    this.children.style.setProperty('--d', `${this.duration}ms`)
    this.children.className = `like-btn-shape ${this.shape}`
    this.parent.append(this.children)
  }

  animate() {
    this.draw()

    const timer = setTimeout(() => {
      this.parent.removeChild(this.children)
      clearTimeout(timer)
    }, this.duration)
  }
}

export function animateParticles(options: {
  total: number
  parent: HTMLElement
}) {
  const { total, parent } = options

  for (let i = 0; i < total; i++) {
    const particle = new Particle({
      x: randomIntBetween(-200, 200),
      y: randomIntBetween(-100, -300),
      rotation: randomIntBetween(-360 * 5, 360 * 5),
      shape: shapes[randomIntBetween(0, shapes.length - 1)] || '',
      color: colors[randomIntBetween(0, colors.length - 1)] || '',
      size: randomIntBetween(4, 7),
      duration: randomIntBetween(400, 800),
      parent,
    })
    particle.animate()
  }
}
