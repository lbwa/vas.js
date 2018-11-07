import FlowingLiquid from '../src'

const flowingLiquid = new FlowingLiquid({
  el: '#chart',
  canvasWidth: 300,
  canvasHeight: 300,
  waterline: 60,
  colors: [
    '#F39C6B',
    '#A0563B',
    'rgba(243, 156, 107, 0.48)',
    'rgba(160, 86, 59, 0.48)'
  ]
})

flowingLiquid.render(5)
