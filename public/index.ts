import Vas, { border } from '../src'

enum DEFAULT_WAVE {
  '#42b9fb', // lighter
  '#117dc4',
  '#1254a4',
  '#243d71' // deeper
}

new Vas({
  el: '#normal',
  width: 300,
  height: 300,
  speed: -0.2,
  render: border(),
  waves: [
    {
      waveHeight: 30,
      color: DEFAULT_WAVE[3],
      progress: 55,
      offset: 70 // It will be ignored When speed option is not zero
    },
    {
      waveHeight: 30,
      color: DEFAULT_WAVE[2],
      progress: 50,
      offset: 70,
      speed: -0.5
    },
    {
      waveHeight: 30,
      color: DEFAULT_WAVE[1],
      progress: 45,
      speed: 1
    },
    { waveHeight: 30, color: DEFAULT_WAVE[0], progress: 40 }
  ]
})

new Vas({
  el: '#background',
  width: 300,
  height: 300,
  render: extraBorder,
  waves: [
    {
      waveHeight: 15,
      color: DEFAULT_WAVE[3],
      progress: 54
    },
    {
      waveHeight: 15,
      color: DEFAULT_WAVE[2],
      progress: 52,
      speed: 1.5
    },
    {
      waveHeight: 15,
      color: DEFAULT_WAVE[1],
      progress: 50,
      speed: 1
    },
    {
      waveHeight: 15,
      color: DEFAULT_WAVE[0],
      progress: 49
    }
  ]
})

function extraBorder({
  ctx,
  width: radius
}: {
  ctx: CanvasRenderingContext2D
  width: number
  [key: string]: any
}) {
  ctx.globalCompositeOperation = 'destination-atop'
  renderCircle({
    ctx,
    radius: radius / 2 - 0.06 * radius,
    color: 'rgba(156, 220, 253, 1)'
  })
  ctx.globalCompositeOperation = 'destination-over'
  renderCircle({ ctx, radius: radius / 2, color: '#ebf9ff' })
}

function renderCircle({
  ctx,
  x = 150,
  y = 150,
  radius,
  startAngle = 0,
  endAngle = 2 * Math.PI,
  anticlockwise,
  color
}: {
  ctx: CanvasRenderingContext2D
  x?: number
  y?: number
  radius: number
  startAngle?: number
  endAngle?: number
  anticlockwise?: boolean | undefined
  color: string
}) {
  ctx.beginPath()
  ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
  ctx.fillStyle = color
  ctx.fill()
  ctx.closePath()
}
