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
  <a href="https://github.com/lbwa/vas.js/pulls?q=is%3Apr+is%3Aclosed">
    <img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed/lbwa/vas.js.svg?logo=github&style=flat-square">
  </a>
</p>

> Vas which is taken from the letters of [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) is a independent component for simplifying wave-like chart building.

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

## Installation

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

| Wave options | required |             default             | description                                                                                                                                                                                  |
| :----------: | :------: | :-----------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  waveHeight  |    ✔️    |               N/A               | wave height                                                                                                                                                                                  |
|    color     |    /     |         white (#ffffff)         | wave color                                                                                                                                                                                   |
|   progress   |    /     |                0                | wave level based on **the bottom of canvas container**                                                                                                                                       |
|    offset    |    /     |                0                | wave offset is used for **frozen** waves which means only works with speed zero                                                                                                              |
|    speed     |    /     | `GlobalOptions.speed` or `-0.1` | The flowing direction is from right to left when you set a positive value, otherwise, from left to right. Wave is static with zero speed. (Priority is **higher** than global speed options) |

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

|    API     | required | default | description                                                                                                                                     |
| :--------: | :------: | :-----: | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|     el     |    ✔️    |   N/A   | A canvas element or selector                                                                                                                    |
|   width    |    /     |   300   | [Canvas width][canvas width]                                                                                                                    |
|   height   |    /     |   300   | [Canvas height][canvas height]                                                                                                                  |
|   speed    |    /     |  -0.5   | The flowing direction is from right to left when you set a positive value, otherwise, from left to right. All waves are static with zero speed. |
| innerColor |    /     |  white  | Customize the background color of inner circle                                                                                                  |
| outerColor |    /     | #ccefff | Customize the background color of outer circle                                                                                                  |
|   waves    |    ✔️    |   N/A   | Every flowing wave with its options                                                                                                             |

[canvas width]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/width
[canvas height]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/height

**NOTICE**

1. `GlobalOptions.speed` has a **lower** priority than `WaveOptions.speed`.

1. The last one of `GlobalOptions.waves` always be the **top** element in the scene

1. You should be careful about `innerColor` and `outerColor` options, because color alpha value could occur **color composite**.

## Instantiation

- Minimal version

```ts
import Vas from 'vasjs'

new Vas({
  el: '#canvas',
  waves: [
    {
      waveHeight: 30
    }
  ]
})
```

You will see **one** wave with **wave level 0**.

- Complex version

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
      color: WAVE_COLOR[3],
      progress: 55,
      offset: 70 // It will be ignored When speed option is not zero
    },
    {
      waveHeight: 30,
      color: WAVE_COLOR[2],
      progress: 50,
      offset: 70,
      speed: -0.5
    },
    {
      waveHeight: 30,
      color: WAVE_COLOR[1],
      progress: 45,
      speed: 1
    },
    { waveHeight: 30, color: WAVE_COLOR[0], progress: 40 }
  ]
})
```

You will see **4** waves in the canvas container. `waves[0]`, `waves[1]`, `waves[3]` are flowing from left to right, `waves[2]` is flowing from right to left.
