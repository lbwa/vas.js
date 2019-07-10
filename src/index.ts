import { assert, animator } from '@/_utils'

enum DEFAULT_COLOR {
  innerColor = 'white',
  outerColor = '#ccefff',
  wave = '#243d71'
}

interface WaveOption {
  waveHeight: number
  color?: string
  progress?: number
  offset?: number
  speed?: number
}

interface Wave extends WaveOption {
  step: number
}

interface VasConstructor {
  el: string | HTMLCanvasElement
  height?: number
  width?: number
  speed?: number
  innerColor?: string
  outerColor?: string
  waves: WaveOption | WaveOption[]
}

class Vas {
  el: HTMLCanvasElement
  height: number
  width: number
  ctx: CanvasRenderingContext2D
  speed: number
  innerColor: string
  outerColor: string
  waves: Wave[]

  constructor({
    el,
    height,
    width,
    speed = -0.5,
    innerColor,
    outerColor,
    waves
  }: VasConstructor) {
    const element = el instanceof Element ? el : document.querySelector(el)
    assert(element, `${el} is not a HTML element.`)

    this.el = element as HTMLCanvasElement
    this.height = this.el.height = height || 300
    this.width = this.el.width = width || 300
    this.ctx = this.el.getContext('2d') as CanvasRenderingContext2D

    this.speed = speed
    this.innerColor = innerColor || DEFAULT_COLOR.innerColor
    this.outerColor = outerColor || DEFAULT_COLOR.outerColor

    this.waves = (Array.isArray(waves) ? waves : [waves]).map(wave =>
      Object.assign(wave, { step: 0 })
    )

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
      color: this.innerColor
    })
    this.ctx.globalCompositeOperation = 'destination-over'
    this.renderCircle({ color: this.outerColor })
    this.ctx.restore()
    animator(this.render)
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

  renderWaves(wave: Wave) {
    const {
      waveHeight,
      color = DEFAULT_COLOR.wave,
      progress = 0,
      offset = 0
    } = wave
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

    const startX = this.balanceStarter(wave, offset)

    // current wave stage, based on the middle of wave body
    const offsetY = height - waveHeight / 2 - (progress / 100) * height

    const waveColor = color

    this.stepper(wave, waveLength * 2)

    ctx.fillStyle = waveColor
    ctx.beginPath()
    ctx.moveTo(startX - wave.step, offsetY)

    for (let i = 0; i < waveTotalPeriods; i++) {
      const dx = waveLength * i
      const offsetX = dx + startX - wave.step
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

  stepper(wave: Wave, limit = this.width) {
    wave.step +=
      wave.speed === 0 ? wave.speed : wave.speed || this.speed || -0.1
    if (
      (wave.step > 0 && wave.step >= limit) ||
      (wave.step < 0 && wave.step <= -limit)
    )
      wave.step = 0
  }

  /**
   * @description Used to control x value of wave start point
   * @private
   */
  private balanceStarter(wave: WaveOption, optionOffset: number) {
    const speed = wave.speed === 0 ? wave.speed : wave.speed || this.speed
    if (speed > 0) return 0
    if (speed < 0) return this.width * -1

    // Wave offset only works with static wave
    return optionOffset
  }
}

export default Vas
