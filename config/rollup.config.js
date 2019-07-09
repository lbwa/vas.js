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

const build = {
  development: {
    input: resolve('src/index.ts'),
    output: resolve('dist/vas.js'),
    format: 'umd',
    env: 'development',
    banner,
    plugins: []
  },

  production: {
    input: resolve('src/index.ts'),
    output: resolve('dist/vas.min.js'),
    format: 'umd',
    env: 'production',
    banner,
    plugins: [
      terser({
        output: {
          comments: /^!/
        }
      })
    ]
  }
}

function createConfig(opts) {
  const options = build[opts]
  const config = {
    input: options.input,
    output: {
      file: options.output,
      format: options.format,
      banner: options.banner,
      name: 'Vas' // global name in window
    },
    plugins: [
      typescript({
        clean: true
      }),
      ...options.plugins
    ]
  }

  return config
}

module.exports = createConfig(process.env.TARGET)
