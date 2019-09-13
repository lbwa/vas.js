export function border({
  inner = 'white',
  outer = '#ccefff'
}: {
  inner?: string
  outer?: string
} = {}) {
  return function({
    ctx,
    width: radius
  }: {
    ctx: CanvasRenderingContext2D
    width: number
    [key: string]: any
  }) {
    ctx.globalCompositeOperation = 'destination-atop'
    renderCircle({ ctx, radius: radius / 2 - 0.06 * radius, color: inner })
    ctx.globalCompositeOperation = 'destination-over'
    renderCircle({ ctx, radius: radius / 2, color: outer })
  }
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
