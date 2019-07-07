<h1 align="center">Vas</h1>

<p align="center">
  <a href="https://lbwa.github.io/vas.js">Online</a>
</p>

> Vas which is taken from the letters of [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) is a JavaScript library for building wave-like chart.

## Installing

```bash
# yarn
yarn add vasjs

# npm
npm i vasjs --save
```

## API

- Wave options

```ts
interface WaveOptions {
  waveHeight: number
  color: string
  progress: number
  offset: number
  speed: number
}
```

| Wave options | required | description                                                                |
| ------------ | -------- | -------------------------------------------------------------------------- |
| waveHeight   | ✅       | wave height                                                                |
| color        | ✅       | wave color                                                                 |
| progress     | ✅       | wave height based on canvas container                                      |
| offset       | -------- | wave offset                                                                |
| speed        | -------- | flowing speed for animation (Priority is higher than global speed options) |

- Global API

```ts
interface GlobalOptions {
  el: string
  width: number
  height: number
  speed: number
  waves: WaveOptions[]
}
```

| API    | required | description                         |
| ------ | -------- | ----------------------------------- |
| el     | ✅       | a canvas element or selector        |
| width  | -------- | canvas width                        |
| height | -------- | canvas height                       |
| speed  | -------- | global flowing speed                |
| waves  | ✅       | Every flowing wave with its options |

**NOTICE**

- `GlobalOptions.speed` has a lower priority than `WaveOptions.speed`.

## Instantiation

```ts
import Vas from 'Vasjs'

enum WAVE_COLOR {
  '#42b9fb',
  '#117dc4',
  '#1254a4',
  '#243d71'
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
      offset: 70,
      speed: -0.5
    },
    {
      waveHeight: 30,
      color: DEFAULT_WAVE[1],
      progress: 5,
      offset: 70,
      speed: -1
    },
    { waveHeight: 30, color: DEFAULT_WAVE[0] }
  ]
})
```
