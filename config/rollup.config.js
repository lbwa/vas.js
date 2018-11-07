const path = require('path')
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace')
const { terser } = require('rollup-plugin-terser')
const version = process.env.version || require('../package.json').version

const resolve = p => path.resolve(__dirname, '../', p)

const banner =
`/*!
  * flowing-liquid v${version}
  * (c) ${new Date().getFullYear()} Bowen<Github: lbwa>
  * @license MIT
  */`

const build = {
  'development': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/flowing-liquid.js'),
    format: 'umd',
    env: 'development',
    banner,
    plugins: []
  },

  'production': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/flowing-liquid.min.js'),
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

function createConfig (opts) {
  const options = build[opts]
  const config = {
    input: options.entry,
    output: {
      file: options.dest,
      format: options.format,
      banner: options.banner,
      name: 'FlowingLiquid' // global name in window
    },
    plugins: [
      ...options.plugins,
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }

  if (options.env) {
    config.plugins.push(
      replace({
        exclude: 'node_modules/**',
        'process.env.NODE_ENV': JSON.stringify(options.env)
      })
    )
  }

  return config
}

module.exports = createConfig(process.env.TARGET)
