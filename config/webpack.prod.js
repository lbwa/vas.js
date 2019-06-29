const path = require('path')

function fromRoot(filePath) {
  return path.join(__dirname, '..', filePath)
}

module.exports = {
  context: fromRoot('./'),

  entry: fromRoot('./src/index.ts'),

  output: {
    path: fromRoot('dist'),
    filename: 'vas.js',
    library: 'vasjs',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': fromRoot('src')
    }
  }
}
