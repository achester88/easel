export class EaselError extends Error {
  constructor(msg) {
    super()
    this.message = msg
    this.value = msg
  }
}

class Canvas {
  constructor(rows = 64, cols = 64) {
    this.default = { r: 0, g: 0, b: 0 }
    this.rows = rows
    this.cols = cols
    this.grid = []
    for (let i = 0; i < cols * rows; i++) {
      this.grid.push(this.default)
    }
  }

  get([x, y]) {
    return this.grid[y * this.cols + x]
  }

  fill([x, y, color]) {
    let cell = this.grid[y * this.cols + x]
    if (!cell) throw new EaselError('Cell out of range')
    cell.r = color.r
    cell.g = color.g
    cell.b = color.b
  }

  erase([x, y]) {
    let cell = this.grid[y * this.cols + x]
    if (!cell) throw new EaselError('Cell out of range')
    cell = { ...this.default }
  }
}

export default {
  Canvas: new Canvas(),
  Color: members => {
    let instance = {}
    for (let key of Object.keys(members)) {
      if (!['r', 'g', 'b'].includes(key))
        throw new Error(`Unexpected member ${key}`)
      instance[key] = members[key]
    }
    return instance
  },
  ink: args => console.log(...args),
  random: range => {
    const [min, max] = range
    if (min >= 0 && max <= 1) return Math.random()
    return Math.random() * (max - min + 1) + min
  },
  round: number => Math.round(number)
}
