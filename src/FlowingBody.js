export default class FlowingBody {
  constructor({
    canvasWidth,
    canvasHeight,
    waveWidth = 0.055, 
    waveHeight = 6,
    xOffset = 0,
    speed = 0.04,
    colors = ['#DBB77A', '#BF8F3B'],
  }) {
    this.points = []
    this.startX = 0
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.waveWidth = waveWidth
    this.waveHeight = waveHeight
    this.xOffset = xOffset
    this.speed = speed
    this.colors = colors
  }
  createFillColor(ctx) {
    if (typeof this.colors === 'string') return this.colors

    const radius = this.canvasWidth / 2
    const gradient = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight)
    gradient.addColorStop(0, this.colors[0])
    gradient.addColorStop(1, this.colors[1])
    return gradient
  }
  render (ctx) {
    const points = this.points
    ctx.save()
    ctx.beginPath()
    this.points.forEach(point => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.lineTo(this.canvasWidth, this.canvasHeight)
    ctx.lineTo(this.startX, this.canvasHeight)
    ctx.lineTo(points[0].x, points[0].y)
    ctx.fillStyle = this.createFillColor(ctx)
    ctx.fill()
    ctx.restore()
  }
  createPointsMap ({
    currentLine,
  }) {
    this.points = []
    const {
      startX,
      waveHeight,
      waveWidth,
      canvasWidth,
      canvasHeight,
      xOffset
    } = this
    for (let x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
      const y = Math.sin(((startX + x) * waveWidth) + xOffset)
      this.points.push({
        x,
        y: canvasHeight * (1 - (currentLine / 100)) + (y * waveHeight)
      })
    }
    this.xOffset = this.xOffset > 2 * Math.PI ? 0 : this.xOffset + this.speed
  }
}
