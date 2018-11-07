import FL from '../lib/FlowingLiquid'
const flow = new FL({
  el: '#chart',
  canvasWidth: 500,
  canvasHeight: 500,
  startX: 0,
  xOffset: 0,
  waveWidth: 0.05,
  waveHeight: 20
})

flow.render({
  speed: 0.05
})
