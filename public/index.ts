import Vas, { border } from '../src'

enum DEFAULT_WAVE {
  '#42b9fb', // lighter
  '#117dc4',
  '#1254a4',
  '#243d71' // deeper
}

const RADIUS_NORMAL = 300
new Vas({
  el: '#with-border-helper',
  width: RADIUS_NORMAL,
  height: RADIUS_NORMAL,
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
      speed: 0.8
    },
    { waveHeight: 30, color: DEFAULT_WAVE[0], progress: 40 }
  ]
})

new Vas({
  el: '#with-custom-render',
  width: 200,
  height: 200,
  render: border({
    inner: 'rgba(156, 220, 253, 1)',
    outer: '#ebf9ff'
  }),
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
      speed: 0.8
    },
    {
      waveHeight: 15,
      color: DEFAULT_WAVE[1],
      progress: 50,
      speed: 0.6
    },
    {
      waveHeight: 15,
      color: DEFAULT_WAVE[0],
      progress: 49
    }
  ]
})
