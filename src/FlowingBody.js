export default class FlowingBody {
  constructor({
    canvasWidth,
    canvasHeight,
    waveWidth = 0.055, 
    waveHeight = 6,
    xOffset = 0,
    speed = 0.04,
    colors = ['#DBB77A', '#BF8F3B'],
  } = {}) {
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
  getChartColor(ctx) {
    const radius = this.canvasWidth / 2
    const grd = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight)
    grd.addColorStop(0, this.colors[0])
    grd.addColorStop(1, this.colors[1])
    return grd
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
    ctx.fillStyle = this.getChartColor(ctx)
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
    this.xOffset += this.speed
  }
}
