import rawIndexes from '../indexes.json'

interface Explosion {
  name: string
  title?: string
  emoji?: string
  description?: string
  color?: string
}

export const indexes: Explosion[] = rawIndexes
