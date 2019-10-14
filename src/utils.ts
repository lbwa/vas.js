export const animator = (function() {
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

export function isString(val: any): val is string {
  return typeof val === 'string'
}

export function isCanvas(el: any): el is HTMLCanvasElement {
  return el instanceof HTMLCanvasElement
}
