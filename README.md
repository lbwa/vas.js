<h1 align="center">Vas</h1>

<p align="center">
  <img align="center" src="./config/preview.gif">
</p>

<p align="center">
  <a href="https://lbwa.github.io/vas.js">Preview</a>
</p>

<p align="center">
  <a href="https://lbwa.github.io/vas.js">
    <img src="https://img.shields.io/bundlephobia/minzip/vasjs.svg?style=flat-square" alt="npm bundle size"/>
  </a>
  <a href="https://www.npmjs.com/package/vasjs">
    <img src="https://img.shields.io/npm/dt/vasjs.svg?style=flat-square" alt="npm"/>
  </a>
  <a href="https://www.npmjs.com/package/vasjs">
    <img alt="npm" src="https://img.shields.io/npm/v/vasjs.svg?logo=npm&style=flat-square">
  </a>
  <a href="https://lbwa.github.io/vas.js">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lbwa/vas.js.svg?style=flat-square">
  </a>
  <a href="https://github.com/lbwa/vas.js/releases">
    <img alt="GitHub release" src="https://img.shields.io/github/release/lbwa/vas.js.svg?logo=github&style=flat-square">
  </a>
  <a href="https://lbwa.github.io/vas.js">
    <img src="https://img.shields.io/website/https/lbwa.github.io/vas.js.svg?logo=github&style=flat-square&up_message=online" alt="github deployment"/>
  </a>
</p>

> Vas which is taken from the letters of [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) is a JavaScript Component for building wave-like chart.

## Features

1. **No any third party dependence** ✔️

   - 100% independent.

1. **Portable** ✔️

   - Just need 3 required parameters to create your own fantastic canvas wave-like animation.

     - Canvas element

     - Wave height

     - Number of all waves

     All other options is optional.

1. **Minimal** ✔️
   - Less than 2 kB with minified and gzipped.

## Install

```bash
# yarn
yarn add vasjs

# npm
npm i vasjs --save
```

## Wave options

Those options is used to control every single wave-like fluid.

```ts
interface WaveOption {
  waveHeight: number
  color: string
  progress?: number
  offset?: number
  speed?: number
}
```

| Wave options | required |             default             | description                                                                |
| :----------: | :------: | :-----------------------------: | -------------------------------------------------------------------------- |
|  waveHeight  |    ✔️    |               N/A               | wave height                                                                |
|    color     |    /     |         white (#ffffff)         | wave color                                                                 |
|   progress   |    /     |                0                | wave height based on canvas container                                      |
|    offset    |    /     |                0                | wave offset is used for frozen waves                                       |
|    speed     |    /     | `GlobalOptions.speed` or `-0.1` | flowing speed for animation (Priority is higher than global speed options) |

**NOTICE**

- Wave body will be frozen when you set a **0** to wave `speed` option.

## Global API

```ts
interface GlobalOptions {
  el: string | HTMLCanvasElement
  height?: number
  width?: number
  speed?: number
  waves: WaveOption | WaveOption[]
}
```

|  API   | required | default | description                         |
| :----: | :------: | :-----: | ----------------------------------- |
|   el   |    ✔️    |   N/A   | a canvas element or selector        |
| width  |    /     |   300   | [canvas width]                      |
| height |    /     |   300   | [canvas height]                     |
| speed  |    /     |  -0.5   | global flowing speed                |
| waves  |    ✔️    |   N/A   | Every flowing wave with its options |

[canvas width]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/width
[canvas height]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/height

**NOTICE**

- `GlobalOptions.speed` has a lower priority than `WaveOptions.speed`.

- The last one of `GlobalOptions.waves` always be the top element in the scene

## Instantiation

```ts
import Vas from 'vasjs'

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
