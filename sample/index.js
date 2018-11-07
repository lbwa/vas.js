import FlowingLiquid from '../src'

const flowingLiquid = new FlowingLiquid({
  el: '#chart',
  canvasWidth: 300,
  canvasHeight: 300,
  waterline: 60,
  flowingBody: [
    {
      waveWidth: 0.055,
      waveHeight: 4,
      colors: ['#F39C6B', '#A0563B'],
      xOffset: 0,
      speed: 0.08
    },
    {
      waveWidth: 0.04,
      waveHeight: 7,
      colors: ['rgba(243, 156, 107, 0.48)', 'rgba(160, 86, 59, 0.48)'],
      xOffset: 2,
      speed: 0.02
    }
  ],
  font: {
    bold: true,
    color: '',
    size: 50,
    family: 'Microsoft Yahei',
    text: ''
  }
})

flowingLiquid.render(5, true)
