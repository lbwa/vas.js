import { assert, animator } from '@/utils'
export * from './helper'

const DEFAULT_WAVE_COLOR = '#243d71'

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
  waves: WaveOption | WaveOption[]
  render?: (instance: Vas) => void
}

export default class Vas {
  el: HTMLCanvasElement
  height: number
  width: number
  ctx: CanvasRenderingContext2D
  speed: number
  waves: Wave[]
  renderer: (...payload: any[]) => void

  constructor({
    el,
    height,
    width,
    speed = -0.5,
    waves,
    render
  }: VasConstructor) {
    const element = el instanceof Element ? el : document.querySelector(el)
    assert(element, `${el} is not a HTML element.`)

    this.el = element as HTMLCanvasElement
    this.height = this.el.height = height || 300
    this.width = this.el.width = width || 300
    this.speed = speed
    this.waves = (Array.isArray(waves) ? waves : [waves]).map(wave =>
      Object.assign(wave, { step: 0 })
    )
    this.ctx = this.el.getContext('2d') as CanvasRenderingContext2D

    assert(
      this.ctx,
      'Unable to initialize Canvas. Your browser or machine may not support it.'
    )

    this.renderer =
      typeof render === 'function'
        ? this.enhanceRenderer.bind(this, render)
        : this.basicRenderer

    this.renderer()
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  private basicRenderer = () => {
    this.clear()
    for (const wave of this.waves) {
      this.renderWaves(wave)
    }
    animator(this.renderer)
  }

  private enhanceRenderer(render: VasConstructor['render']) {
    this.clear()
    for (const wave of this.waves) {
      this.renderWaves(wave)
    }
    this.ctx.save()
    render && render(this)
    this.ctx.restore()
    animator(this.renderer)
  }

  renderWaves(wave: Wave) {
    const {
      waveHeight,
      color = DEFAULT_WAVE_COLOR,
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
