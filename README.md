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
  <a href="https://github.com/lbwa/vas.js/releases">
    <img alt="GitHub release" src="https://img.shields.io/github/release/lbwa/vas.js.svg?logo=github&style=flat-square">
  </a>
  <a href="https://github.com/lbwa/vas.js/pulls?q=is%3Apr+is%3Aclosed">
    <img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed/lbwa/vas.js.svg?logo=github&style=flat-square">
  </a>
  <a href="https://github.com/lbwa/vas.js/actions">
    <img alt="github workflow" src="https://github.com/lbwa/vas.js/workflows/Deployment/badge.svg">
  </a>
</p>

> Vas which is taken from the letters of [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) is a independent component for simplifying wave-like chart building.

## Features

1. **Minimal** ✔️

   - Less than **2** kB with minified and gzipped.

1. **Support any shapes container** ✔️

   - Define any shapes as all waves containers with the `plugin` option.

1. **Portable** ✔️

   - Only a few required parameters for fantastic canvas wave-like animation.

     - The target `<canvas>` element

     - All members of flowing waves

1. **No any third party dependence** ✔️

   - 100% independent.

## Installation

```bash
# yarn
yarn add vasjs

# npm
npm i vasjs --save
```

## Wave options

Those options are used to control every single wave-like fluid.

```ts
interface WaveOptions {
  height: number
  color?: string
  progress?: number
  offset?: number
  speed?: number
}
```

| Wave options | Required |        Default        | Description                                                                                                                                                                                 |
| :----------: | :------: | :-------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    height    |    ✔️    |          N/A          | Wave height                                                                                                                                                                                 |
|    color     |    /     |       `#243d71`       | Wave body color                                                                                                                                                                             |
|   progress   |    /     |           0           | Wave level based on **the bottom of canvas container**                                                                                                                                      |
|    offset    |    /     |           0           | Wave offset is used for **frozen** waves which means only works with speed zero                                                                                                             |
|    speed     |    /     | `RenderOptions.speed` | The flowing direction is from right to left when you set a positive value, otherwise, from left to right. Wave is static with zero speed. (Priority is **higher** than global speed option) |

**NOTICE**

- Wave body will be frozen when `Vas` gets a zero value from the `speed` option.

## Global API

```ts
interface RenderOptions {
  el: string | HTMLCanvasElement
  waves: WaveOptions | WaveOptions[]
  width?: number
  height?: number
  devicePixelRatio?: number
  period?: number
  speed?: number
  plugin?: (context: CanvasRenderingContext2D) => void
}
```

|       API        | Required |                                              Default                                              | Description                                                                                                                                     |
| :--------------: | :------: | :-----------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|        el        |    ✔️    |                                                N/A                                                | A `<canvas>` element or selector string                                                                                                         |
|      waves       |    ✔️    |                                                N/A                                                | Every fluid with its options                                                                                                                    |
|      width       |    /     |                                               `300`                                               | Canvas **CSS** width instead of logic width in the memory                                                                                       |
|      height      |    /     |                                               `300`                                               | Canvas **CSS** height instead of logic height in the memory                                                                                     |
| devicePixelRatio |    /     |           `window.devicePixelRatio` or if it does not exist, the value of option is 1.            | [Hight resolution adaptation](#Hight-resolution-adaptation)                                                                                     |
|      period      |    /     | The value of a number rounded to the nearest quotient between global width and default lambda 60. | The period of waves                                                                                                                             |
|      speed       |    /     |                                               `0.3`                                               | The flowing direction is from right to left when you set a positive value, otherwise, from left to right. All waves are static with zero speed. |
|      plugin      |    /     |                                                N/A                                                | The current [CanvasRenderingContext2D] will be passed into this function.                                                                       |

[canvasrenderingcontext2d]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

**NOTICE**

1. `RenderOptions.speed` (Global API) has a **lower** priority than `WaveOptions.speed`.

1. The **first** item in the `RenderOptions.waves` list always be the **top** element in the scene.

1. You should be careful about `plugin` options and color alpha value, because color alpha value could occur **color composite**.

   Canvas rendering context state will be **saved** before `plugin` calling, then **restored** after `plugin` calling.

   ```ts
   import createRender from 'vasjs'

   createRender({
     // omit unrelated options ...
     plugin: (context: CanvasRenderingContext2D) => {
       // saved before `plugin` calling, then restored after `plugin` calling
     }
   })
   ```

## Instantiation

- Basic creator

  ```ts
  import createRender from 'vasjs'

  createRender({
    el: '#canvas',
    waves: [
      {
        height: 30
      }
    ]
  })
  ```

  You will see **one** wave with **wave level 0**.

- Advanced creator

  ```ts
  import createRender from 'vasjs'

  enum WAVE_COLOR {
    '#42b9fb',
    '#117dc4',
    '#1254a4',
    '#243d71'
  }

  createRender({
    el: '#draw',
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
  ```

- With [plugin](./src/plugins.ts) functionalities, only support `border` temporarily.

  ```ts
  import createRender, { border } from 'vasjs'

  createRender({
    // omit unrelated options...
    plugin: border({
      inner: 'white', // optional
      outer: '#ccefff' // optional
    })
  })
  ```

  You will see the shapes like [demo](https://lbwa.github.io/vas.js) page style.

## Instance methods

It always returns an object including all render handlers when `createRender` has been invoked.

```ts
// assign to a variable
const render = createRender({
  /* omit options ... */
})
```

|                API                | Async / Sync |          Description          |
| :-------------------------------: | :----------: | :---------------------------: |
|  [on](#activate-render-process)   |     sync     |  Activate all render process  |
| [off](#deactivate-render-process) |     sync     | Deactivate all render process |

### Activate render process

- `on`: `() => void`

```ts
render.on()
```

### Deactivate render process

- `off`: `(clear: boolean) => void`

```ts
render.off()

// pause animation and clear canvas area
render.off(true)
```

## Hight resolution adaptation

Hight resolution adaptation based on `window.devicePixelRatio` has been supported by default (since `v2.2.0`).

If you need to change default ratio:

```ts
import createRender from 'vasjs'

createRender({
  devicePixelRatio: YOUR_RATIO // should be greater than one
  // omit other options ...
})
```

## Changelog

All notable changes to this project will be documented in [CHANGELOG](./CHANGELOG.md) file.

## License

MIT © [Bowen Liu](https://github.com/lbwa)
