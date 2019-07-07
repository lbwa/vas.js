import Vas from '../src'

enum DEFAULT_WAVE {
  '#42b9fb', // lighter
  '#117dc4',
  '#1254a4',
  '#243d71' // deeper
}

new Vas({
  el: '#draw',
  width: 300,
  height: 300,
  speed: -0.2,
  waves: [
    {
      waveHeight: 30,
      color: DEFAULT_WAVE[3],
      progress: 15,
      offset: 70
    },
    {
      waveHeight: 30,
      color: DEFAULT_WAVE[2],
      progress: 10,
      offset: 70
    },
    {
      waveHeight: 30,
      color: DEFAULT_WAVE[1],
      progress: 5,
      offset: 70
    },
    { waveHeight: 30, color: DEFAULT_WAVE[0] }
  ]
})
