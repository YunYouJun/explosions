export interface MinMax {
  min: number
  max: number
}

export interface FireworksConfig {
  selector: string
  colors: string[]
  numberOfParticles: number
  orbitRadius: MinMax
  circleRadius: MinMax
  diffuseRadius: MinMax
  animeDuration: MinMax
}

export interface Point {
  x: number
  y: number
}

export interface Particle extends Point {
  color: string
  radius: number
  endPos: Point
  draw: () => void
}
