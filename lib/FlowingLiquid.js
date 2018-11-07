export default class FL {
  constructor ({
    el, // element
    canvasWidth = 500,
    canvasHeight = 500,
    startX = 0,
    xOffset = 0,
    waveWidth = 0.05,
    waveHeight = 20
  }) {
    if (typeof el !== 'string') throw new Error('el should be a String !')
  
    this.canvas = document.querySelector(el)
    this.context = this.canvas.getContext('2d')
    this.canvasWidth = this.canvas.width = canvasWidth
    this.canvasHeight = this.canvas.height = canvasHeight

    this.startX = startX
    this.xOffset = xOffset
    this.waveWidth = waveWidth
    this.waveHeight = waveHeight
  }

  frameRender (xOffset) {
    const points = []
    const pointXLimit = this.startX + this.canvasWidth
    const startX = this.startX
    const waveWidth = this.waveWidth
    const waveHeight = this.waveHeight
    const canvasWidth = this.canvasWidth
    const canvasHeight = this.canvasHeight
    const context = this.context
    const sin = Math.sin.bind(Math)
    this.context.beginPath()

    for (let x = startX; x < pointXLimit; x += 20 / canvasWidth) {
      const y = waveHeight * sin((startX + x) * waveWidth + xOffset)
      points.push({
        x,
        y: canvasHeight / 2 + y
      })
      context.lineTo(x, canvasHeight / 2 + y)
    }

    context.lineTo(canvasWidth, canvasHeight)
    context.lineTo(startX, canvasHeight)
    context.lineTo(points[0].x, points[0].y)
    context.stroke()
  }

  animator () {
    const context = this.context
    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.frameRender(this.xOffset)
    this.xOffset = this.xOffset > 2 * Math.PI
      ? 0
      : this.xOffset + this.speed
    requestAnimationFrame(this.animator.bind(this))
  }

  render ({
    speed = 0.1
  }) {
    this.speed = speed
    requestAnimationFrame(this.animator.bind(this))
  }
}
