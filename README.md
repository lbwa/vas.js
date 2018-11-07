# flowing-liquid ![npm](https://img.shields.io/npm/v/flowing-liquid.svg?style=flat-square)

> A component for building flowing chart.

## Installing

```bash
# yarn
yarn add flowing-liquid

# npm
npm i flowing-liquid --save
```

## Usage

```js
import FlowingLiquid from 'flowing-liquid'

const flowingLiquid = new FlowingLiquid({
  el: '#chart', // canvas element
  canvasWidth: 300, // canvas element width
  canvasHeight: 300, // canvas element height
  waterline: 60, // target waterline
  // one of waves will filled by colors[2n], colors[2n+1]
  colors: [
    '#F39C6B',
    '#A0563B',
    'rgba(243, 156, 107, 0.48)',
    'rgba(160, 86, 59, 0.48)'
  ],
  // indicator text, default value is parameter waterline
  font: {
    bold: true,
    color: '',
    size: 50,
    family: 'Microsoft Yahei',
    text: ''
  }
})

// 1st parameter means multiple waves spacing
// 2nd parameter means if canvas element show indicator text
flowingLiquid.render(5, true)
```
