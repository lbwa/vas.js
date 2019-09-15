import { assert, animator } from '@/utils'
export * from './helper'

const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 300
const DEFAULT_WAVE_COLOR = '#243d71'
// To control MAX value of step number
const ENTIRE_WAVES_OFFSET_TIME = 2
const DEFAULT_LAMBDA = 60 // default wavelength

type WaveOption = Readonly<{
  waveHeight: number
  color?: string
  progress?: number
  offset?: number
  speed?: number
  period?: number
}>

interface WaveMeta {
  step: number
  startX: number
  offsetY: number
  totalPeriods: number
  totalLambda: number
  lambda: number
}

type Wave = WaveOption & WaveMeta

interface VasConstructor {
  el: string | HTMLCanvasElement
  height?: number
  width?: number
  speed?: number
  waves: WaveOption | WaveOption[]
  render?: (instance: Vas) => void
  period?: number
}

export default class Vas {
  el: HTMLCanvasElement
  height: number
  width: number
  ctx: CanvasRenderingContext2D
  speed: number
  waves: Wave[]
  renderer: (...payload: any[]) => void
  period: number

  constructor({
    el,
    height,
    width,
    speed = -0.5,
    waves,
    render,
    period
  }: VasConstructor) {
    const element = el instanceof Element ? el : document.querySelector(el)
    assert(element, `${el} is not a HTML element.`)

    this.el = element as HTMLCanvasElement
    this.height = this.el.height = height || DEFAULT_HEIGHT
    this.width = this.el.width = width || DEFAULT_WIDTH
    this.period = period || Math.round(this.width / DEFAULT_LAMBDA)
    this.speed = speed
    this.waves = (Array.isArray(waves) ? waves : [waves]).map(wave =>
      Object.assign(wave, this.createWaveMeta(wave))
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

  createWaveMeta(wave: WaveOption) {
    const meta = { step: 0 } as WaveMeta
    const { offset, waveHeight, progress = 0, period = this.period } = wave
    meta.startX = this.getStartX(wave, offset || 0)

    meta.totalLambda = this.width * ENTIRE_WAVES_OFFSET_TIME

    /**
     * @description Similar to wave spatial frequency, but this describe how
     *  many period exist in entire life-cycle, not unit of space
     * @wiki https://en.wikipedia.org/wiki/Spatial_frequency
     */
    meta.totalPeriods = period % 2 ? period + 1 : period

    /**
     * @description The distance over which the wave's shape repeats
     * @wiki https://en.wikipedia.org/wiki/Wavelength
     */
    meta.lambda = meta.totalLambda / meta.totalPeriods

    // current wave stage, based on the middle of wave body
    meta.offsetY = this.height - waveHeight / 2 - (progress / 100) * this.height

    return meta
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  destroy(fn?: (...payload: any[]) => any) {
    this.renderer = () => fn && fn()
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
      startX,
      totalLambda,
      totalPeriods,
      lambda,
      offsetY
    } = wave
    const { ctx, height } = this

    ctx.fillStyle = color
    ctx.beginPath()
    this.stepper(wave, totalLambda / ENTIRE_WAVES_OFFSET_TIME)
    ctx.moveTo(startX - wave.step, offsetY)

    for (let i = 0; i < totalPeriods; i++) {
      const dx = lambda * i
      const offsetX = dx + startX - wave.step
      ctx.quadraticCurveTo(
        offsetX + lambda / 4,
        offsetY + waveHeight,
        offsetX + lambda / 2,
        offsetY
      )
      ctx.quadraticCurveTo(
        offsetX + lambda / 4 + lambda / 2,
        offsetY - waveHeight,
        offsetX + lambda,
        offsetY
      )
    }

    ctx.lineTo(startX + totalLambda, height)
    ctx.lineTo(startX, height)
    ctx.fill()
    ctx.closePath()
  }

  stepper(wave: Wave, limit = 0) {
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
  private getStartX(wave: WaveOption, optionOffset: number) {
    const speed = wave.speed === 0 ? wave.speed : wave.speed || this.speed
    if (speed > 0) return 0
    if (speed < 0) return this.width * -1

    // Wave offset only works with static wave
    return optionOffset
  }
}
