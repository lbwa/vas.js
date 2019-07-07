import { assert } from '@/_utils'

enum DEFAULT_COLOR {
  bg = 'white',
  gap = '#ccefff'
}

interface VasConstructor {
  el: string | Element
  height: string | number
  width: string | number
  speed: number
  waves: Wave | Wave[]
}

interface Wave {
  waveHeight: number
  color: string
  progress?: number
  offset?: number
}

const _worker = (function() {
  return (
    window.requestAnimationFrame.bind(window) ||
    window.webkitRequestAnimationFrame.bind(window) ||
    (window as any).mozRequestAnimationFrame.bind(window) ||
    (window as any).oRequestAnimationFrame.bind(window) ||
    (window as any).msRequestAnimationFrame.bind(window) ||
    function(callback) {
      return window.setTimeout(callback, 1000 / 60)
    }
  )
})()

class Vas {
  el: HTMLCanvasElement
  height: number
  width: number
  ctx: CanvasRenderingContext2D
  speed: number
  waves: Wave[]
  private stepOffset: number

  constructor({ el, height, width, speed = -0.5, waves }: VasConstructor) {
    const element = el instanceof Element ? el : document.querySelector(el)
    assert(element, `${el} is not a HTML element.`)

    this.el = element as HTMLCanvasElement
    this.height = this.el.height =
      typeof height === 'number' ? height : parseInt(height)
    this.width = this.el.width =
      typeof width === 'number' ? width : parseInt(width)
    this.ctx = this.el.getContext('2d') as CanvasRenderingContext2D

    this.stepOffset = 0
    this.speed = speed

    this.waves = Array.isArray(waves) ? waves : [waves]

    assert(
      this.ctx,
      'Unable to initialize Canvas. Your browser or machine may not support it.'
    )

    this.render()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  render = () => {
    this.clear()
    this.ctx.save()
    for (const wave of this.waves) {
      this.renderWaves(wave)
    }
    this.ctx.globalCompositeOperation = 'destination-atop'
    this.renderCircle({
      radius: this.width / 2 - 0.06 * this.width,
      color: 'white'
    })
    this.ctx.globalCompositeOperation = 'destination-over'
    this.renderCircle({ color: DEFAULT_COLOR.gap })
    this.ctx.restore()
    _worker(this.render)
  }

  renderCircle({
    x = this.width / 2,
    y = this.height / 2,
    radius = this.width / 2,
    startAngle = 0,
    endAngle = 2 * Math.PI,
    anticlockwise,
    color
  }: {
    x?: number
    y?: number
    radius?: number
    startAngle?: number
    endAngle?: number
    anticlockwise?: boolean | undefined
    color: string
  }) {
    const { ctx } = this
    ctx.beginPath()
    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
  }

  renderWaves({
    waveHeight,
    color = DEFAULT_COLOR.bg,
    progress = 0,
    offset = 0
  }: Wave) {
    const { ctx, width, height } = this

    /**
     * @description Similar to wave spatial frequency, but this describe how
     *  many period exist in entries life-cycle, not unit of space
     * @wiki https://en.wikipedia.org/wiki/Spatial_frequency
     */
    const waveTotalPeriods = 5
    /**
     * @description The distance over which the wave's shape repeats
     * @wiki https://en.wikipedia.org/wiki/Wavelength
     */
    const waveTotalLength = width * 2
    const waveLength = waveTotalLength / waveTotalPeriods

    const centerY = height / 2
    const startX = -waveLength * 2.5 + offset
    const startY = centerY

    const offsetY = startY - (progress / 100) * this.height // current wave stage
    const waveColor = color

    this.stepper(this.speed, waveLength * 2)

    ctx.fillStyle = waveColor
    ctx.beginPath()
    ctx.moveTo(startX - this.stepOffset, offsetY)

    for (let i = 0; i < waveTotalPeriods; i++) {
      const dx = waveLength * i
      const offsetX = dx + startX - this.stepOffset
      ctx.quadraticCurveTo(
        offsetX + waveLength / 4,
        offsetY + waveHeight,
        offsetX + waveLength / 2,
        offsetY
      )
      ctx.quadraticCurveTo(
        offsetX + waveLength / 4 + waveLength / 2,
        offsetY - waveHeight,
        offsetX + waveLength,
        offsetY
      )
    }

    ctx.lineTo(startX + waveTotalLength, height)
    ctx.lineTo(startX, height)
    ctx.fill()
    ctx.closePath()
  }

  stepper(flowingSpeed: number, limit = this.width) {
    this.stepOffset += flowingSpeed
    if (
      (this.stepOffset > 0 && this.stepOffset >= limit) ||
      (this.stepOffset < 0 && this.stepOffset <= -limit)
    )
      this.stepOffset = 0
  }
}

export default Vas
