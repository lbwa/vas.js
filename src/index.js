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
    ],
    font = {
      bold: true,
      color: '',
      size: 50,
      family: 'Microsoft Yahei',
      text: ''
    }
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
    this.waterline = waterline <= 100 ? waterline : 100
    this.colors = colors
    this.font = font

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
  render (waveSpacing = 5, showText = false) {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    if (!this.hasRenderedContainer) this.drawContainer(ctx)

    if (this.currentLine < this.waterline) this.currentLine += 1
    this.waves.forEach((wave, index) => {
      wave.createPointsMap({
        currentLine: this.currentLine + index * waveSpacing
      })
      wave.render(ctx)
      if (showText) this.renderText(ctx, `${this.currentLine}`)
    })

    window.requestAnimationFrame(this.render.bind(this, waveSpacing, showText))
  }

  renderText (ctx, text) {
    const font  = this.font
    const fontStyle = `${font.bold ? 'bold' : ''} `
     + `${font.size || 50}px `
     + `${font.family || 'Microsoft Yahei'}`

    ctx.font = fontStyle
    ctx.fillStyle = font.color || 'rgba(160, 86, 60, 1)'
    ctx.textAlign = 'center'
    ctx.fillText(
      font.text ? font.text : text,
      this.canvasWidth / 2,
      this.canvasHeight / 2 + this.font.size / 2
    )
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
