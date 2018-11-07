import FlowingBody from './FlowingBody'

export default class FlowingLiquid {
  constructor({
    el,
    canvasWidth = 500,
    canvasHeight = 500,
    waterline = 60,
    colors = [
      '#F39C6B',
      '#A0563B',
      'rgba(243, 156, 107, 0.48)',
      'rgba(160, 86, 59, 0.48)'
    ]
  }) {
    if (typeof el !== 'string') throw new Error(
      'Parameter el should be a String !'
    )
    const canvas = this.canvas = document.querySelector(el)
    this.canvasWidth = canvas.width = canvasWidth
    this.canvasHeight = canvas.height = canvasHeight
    this.hasRenderedContainer = false

    // control flowing wave current height
    this.currentLine = 0

    // control flowing wave target height
    this.waterline = waterline
    this.colors = colors

    this.waves = [
      new FlowingBody({
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight,
        waveWidth: 0.055,
        waveHeight: 4,
        colors: [this.colors[0], this.colors[1]],
        xOffset: 0,
        speed: 0.04
      }),
      new FlowingBody({
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight,
        waveWidth: 0.04,
        waveHeight: 7,
        colors: [this.colors[2], this.colors[3]],
        xOffset: 2,
        speed: 0.02
      })
    ]
  }

  /**
   * @param {Number} waveSpacing control multiple wave spacing
   */
  render (waveSpacing = 5) {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    if (!this.hasRenderedContainer) this.drawContainer(ctx)

    if (this.currentLine < this.waterline) this.currentLine += 1
    this.waves.forEach((wave, index) => {
      wave.createPointsMap({
        currentLine: this.currentLine + index * waveSpacing
      })
      wave.render(ctx)
    })

    window.requestAnimationFrame(this.render.bind(this, waveSpacing))
  }

  drawContainer (ctx) {
    const radius = this.canvasWidth / 2
    const lineWidth = 4
    const innerRadius = radius - (lineWidth)
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.arc(radius, radius, innerRadius, 0, 2 * Math.PI)
    ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)'
    ctx.stroke()
    ctx.clip()
    this.hasRenderedContainer = true
  }
}
