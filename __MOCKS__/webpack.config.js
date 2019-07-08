const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')

const fromRoot = p => path.resolve(__dirname, '../', p)

const __DEV__ = process.env.NODE_ENV === 'development'

const config = {
  mode: __DEV__ ? 'development' : 'production',
  context: fromRoot('./'),
  entry: {
    sample: fromRoot('__MOCKS__/index.ts')
  },
  output: {
    path: fromRoot('./docs'),
    filename: __DEV__ ? '[name].[hash].js' : '[name].[contenthash:8].js',
    publicPath: __DEV__ ? '/' : './'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': fromRoot('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: fromRoot('__MOCKS__/index.html')
    }),
    new WebpackBar({
      name: 'Vas.js bundler',
      reporter: {
        done(ctx) {
          __DEV__ &&
            console.log(
              `[DEV]: Server is running at http://localhost:${
                config.devServer.port
              }`
            )
        }
      }
    })
  ]
}

if (__DEV__) {
  config.devtool = 'cheap-module-eval-source-map'
  config.devServer = {
    host: '0.0.0.0',
    port: 8080,
    clientLogLevel: 'warning',
    // web 页的错误遮罩
    overlay: {
      warnings: true,
      errors: true
    },
    hot: true,
    noInfo: true
  }
} else {
  config.optimization = {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor'
        }
      }
    }
  }
}

module.exports = config
