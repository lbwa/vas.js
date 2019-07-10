import Vas from '../src'

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
  innerColor: 'rgba(156, 220, 253, 1)',
  outerColor: '#ebf9ff',
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
