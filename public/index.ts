import createApp, { border } from '../src'

enum DEFAULT_WAVE {
  '#42b9fb', // lighter
  '#117dc4',
  '#1254a4',
  '#243d71' // deeper
}

const RADIUS_NORMAL = 300
createApp({
  el: '#with-border-helper',
  width: RADIUS_NORMAL,
  height: RADIUS_NORMAL,
  speed: -0.2,
  plugin: border(),
  waves: [
    {
      height: 30,
      color: DEFAULT_WAVE[0],
      progress: 40,
      offset: 10 // It will be ignored When speed option is not zero
    },
    {
      height: 30,
      color: DEFAULT_WAVE[1],
      progress: 45,
      offset: 70,
      speed: -0.5
    },
    {
      height: 30,
      color: DEFAULT_WAVE[2],
      progress: 50,
      speed: 0.8
    },
    { height: 30, color: DEFAULT_WAVE[3], progress: 55 }
  ]
})

createApp({
  el: '#with-custom-render',
  width: 200,
  height: 200,
  plugin: border({
    inner: 'rgba(156, 220, 253, 1)',
    outer: '#ebf9ff'
  }),
  waves: [
    {
      height: 15,
      color: DEFAULT_WAVE[0],
      progress: 49
    },
    {
      height: 15,
      color: DEFAULT_WAVE[1],
      progress: 50,
      speed: 0.6
    },
    {
      height: 15,
      color: DEFAULT_WAVE[2],
      progress: 52,
      speed: 0.8
    },
    {
      height: 15,
      color: DEFAULT_WAVE[3],
      progress: 54
    }
  ]
})
