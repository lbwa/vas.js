import FlowingLiquid from '../src'

const flowingLiquid = new FlowingLiquid({
  el: '#chart',
  canvasWidth: 300,
  canvasHeight: 300,
  waterline: 60,
  flowingBody: [
    {
      waveWidth: 0.025,
      waveHeight: 8,
      colors: ['rgba(156, 220, 253, .6)', 'rgba(156, 220, 253, .6)'],
      xOffset: 0,
      speed: 0.04
    },
    {
      waveWidth: 0.035,
      waveHeight: 7,
      colors: ['rgba(119, 210, 253, .4)', 'rgba(119, 210, 253, .4)'],
      xOffset: 2,
      speed: 0.02
    }
  ],
  background: {
    color: 'dodgerblue',
    style: 'fill'
  },
  font: {
    color: 'white'
  }
})

flowingLiquid.render(1, true)
