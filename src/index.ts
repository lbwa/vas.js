import { isString, isCanvas, animator, noop } from '@/utils'

export * from './plugins'

interface WaveOptions {
  height: number
  color?: string
  progress?: number
  offset?: number
  speed?: number
}

interface RenderOptions {
  el: string | HTMLCanvasElement
  waves: WaveOptions | WaveOptions[]
  width?: number
  height?: number
  devicePixelRatio?: number
  period?: number
  speed?: number
  plugin?: (context: CanvasRenderingContext2D) => void
}

interface WaveWithMeta extends WaveOptions {
  step: number
  actualSpeed: number
  startX: number
  totalLambda: number
  totalPeriods: number
  lambda: number
  offsetY: number
}

interface Controllers {
  on: () => void
  off: (clear: boolean) => void
}

const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 300
const DEFAULT_WAVE_COLOR = '#243d71'
const ENTIRE_WAVES_OFFSET_TIME = 2 // To control MAX value of step number
const DEFAULT_LAMBDA = 60 // default wavelength
const DEFAULT_DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1
const DEFAULT_GLOBAL_SPEED = 0.3

function getCanvas(el: string | HTMLCanvasElement) {
  const canvas = el && (el instanceof Element ? el : document.querySelector(el))
  if (!isCanvas(canvas))
    throw new Error(`Option el (input: ${el}) is not a valid Canvas element.`)
  return canvas
}

function getCanvasContext(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')!
  if (!context)
    throw new Error(
      `Unable to initialize Canvas 2D context. Your browser or machine may not support it.`
    )
  return context
}

function resolution(
  context: CanvasRenderingContext2D,
  width: number | string,
  height: number | string,
  devicePixelRatio?: number
) {
  const { canvas } = context
  const dpr = devicePixelRatio || DEFAULT_DEVICE_PIXEL_RATIO

  // set display size (CSS pixel)
  canvas.style.width = isString(width) ? width : width + 'px'
  canvas.style.height = isString(height) ? height : height + 'px'

  // set actual size in memory (scaled to account for extra pixel density)
  canvas.width = +width * dpr
  canvas.height = +height * dpr

  context.scale(dpr, dpr)
  return context
}

function initWave(
  wave: Readonly<WaveOptions>,
  period: number,
  globalSpeed: number,
  drawingWidth: number,
  drawingHeight: number
): WaveWithMeta {
  const speed = wave.speed === 0 ? wave.speed : wave.speed || globalSpeed
  const offset = wave.offset || 0

  const totalLambda = drawingWidth * ENTIRE_WAVES_OFFSET_TIME
  const totalPeriods = period % 2 ? period + 1 : period

  const meta = {
    step: 0,
    actualSpeed: speed,
    startX: speed > 0 ? 0 : speed < 0 ? drawingWidth * -1 : offset,
    totalLambda: totalLambda,
    totalPeriods: totalPeriods,
    lambda: totalLambda / totalPeriods,
    offsetY: (1 - (wave.progress || 0) / 100) * drawingHeight - wave.height / 2
  }
  return Object.assign(wave, meta)
}

function renderWave(
  context: CanvasRenderingContext2D,
  wave: ReturnType<typeof initWave>,
  drawingHeight: number
) {
  const {
    height,
    color = DEFAULT_WAVE_COLOR,
    startX,
    totalLambda,
    totalPeriods,
    lambda,
    offsetY
  } = wave
  context.fillStyle = color
  context.beginPath()

  const limit = totalLambda / ENTIRE_WAVES_OFFSET_TIME
  wave.step += wave.actualSpeed
  if (
    (wave.step > 0 && wave.step >= limit) ||
    (wave.step < 0 && wave.step <= -limit)
  ) {
    wave.step = 0
  }
  context.moveTo(startX - wave.step, offsetY)

  for (let i = 0; i < totalPeriods; i++) {
    const dx = lambda * i
    const offsetX = dx + startX - wave.step
    context.quadraticCurveTo(
      offsetX + lambda / 4,
      offsetY + height,
      offsetX + lambda / 2,
      offsetY
    )
    context.quadraticCurveTo(
      offsetX + (lambda / 4 + lambda / 2),
      offsetY - height,
      offsetX + lambda,
      offsetY
    )
  }

  context.lineTo(startX + totalLambda, drawingHeight)
  context.lineTo(startX, drawingHeight)
  context.fill()
  context.closePath()
}

function createFramer(
  context: CanvasRenderingContext2D,
  waves: ReturnType<typeof initWave>[],
  plugin?: RenderOptions['plugin']
) {
  const drawingWidth = context.canvas.width
  const drawingHeight = context.canvas.height
  const clear = () => context.clearRect(0, 0, drawingWidth, drawingHeight)

  if (plugin) {
    return function enhance() {
      clear()
      let len = waves.length
      while (len--) {
        renderWave(context, waves[len], drawingHeight)
      }
      context.save()
      plugin(context)
      context.restore()
    }
  }
  return function basic() {
    clear()
    let len = waves.length
    while (len--) {
      renderWave(context, waves[len], drawingHeight)
    }
  }
}

export default function createRender(
  {
    el,
    waves,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    devicePixelRatio = DEFAULT_DEVICE_PIXEL_RATIO,
    period = Math.round(width / DEFAULT_LAMBDA),
    speed = DEFAULT_GLOBAL_SPEED,
    plugin
  }: Readonly<RenderOptions> = {} as RenderOptions
): Controllers {
  const canvas = getCanvas(el)

  const context = resolution(
    getCanvasContext(canvas),
    width,
    height,
    devicePixelRatio
  )

  const wavesWithMeta = (Array.isArray(waves) ? waves : [waves]).map((wave) =>
    initWave(wave, period, speed, width, height)
  )

  let framer = createFramer(context, wavesWithMeta, plugin)
  const run = (framer: (this: void) => void) => {
    framer()
    animator(() => loop(framer))
  }
  let loop = run
  const start = () => {
    loop(framer)
    return {
      on: () => {
        if (loop === noop) {
          loop = run
          loop(framer)
        }
      },
      off: (clear: boolean) => {
        loop = noop

        if (clear) {
          context.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
    }
  }
  return start()
}
