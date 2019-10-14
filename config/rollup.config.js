import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import path from 'path'
const version = require('../package.json').version

const resolve = p => path.resolve(__dirname, '../', p)

const banner = `/*!
  * vasjs v${version}
  * (c) ${new Date().getFullYear()} Bowen<Github: lbwa>
  * @license MIT
  */`

const formatMap = {
  esm: 'esm',
  umd: 'umd',
  cjs: 'cjs'
}

function createConfig(target) {
  const format = formatMap[target || process.env.TARGET]

  if (!format)
    throw new Error(
      `[CONFIG]: ${target || process.env.TARGET} is unknown format.`
    )

  return {
    input: resolve('src/index.ts'),
    output: {
      file: resolve(`dist/vas.${format === formatMap.cjs ? 'min' : format}.js`),
      format,
      banner,
      name: 'Vas', // global name in window
      exports: 'named'
    },
    plugins: [
      typescript({
        clean: true
      }),
      terser({
        output: {
          comments: /^!/
        }
      })
    ]
  }
}

module.exports = createConfig()
