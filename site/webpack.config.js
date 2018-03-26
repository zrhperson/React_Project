process.traceDeprecation = true

const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const beautify = require('code-beautify')

const postCssFor = require('postcss-for');
const autoprefixer = require('autoprefixer');

const config = {
  context: path.resolve(__dirname),
  entry: [
    path.resolve(__dirname, './index.js')
  ],
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  module: {
    //noParse: /react|react-dom/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'stage-0', 'react'],
              plugins: ['transform-runtime']
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf|png|jpg|jpeg)(\?v=[\d\.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              plugins: function(){
                return [postCssFor, autoprefixer];
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              plugins: function(){
                return [postCssFor, autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ]
                })];
              }
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          'html-loader',
          {
            loader: 'markdown-loader',
            options: {
              highlight: function(code, lang){ beautify(code, lang) }
            }
          }
        ]
      },
      {
        test: /\.doc$/,
        use: [
          'babel-loader',
          'doc-loader'
        ]
      }
    ]
  },
  resolveLoader: {
    alias: {
      'doc-loader': path.join(__dirname, './loaders/doc')
    }
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'bocomui': path.resolve(__dirname, '../src'),
      'public': path.resolve(__dirname, './public')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devtool: 'source-map'
}

module.exports = config
