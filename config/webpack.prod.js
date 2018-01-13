const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const glob = require('glob')

const rootPath = path.join(__dirname, '../')

const entries = getEntry(rootPath + 'src/page/**/*.js', rootPath + 'src/page/')
const HtmlWebpackPlugins = []

function getEntry(globPath, pathDir) {
  var files = glob.sync(globPath)
  console.log(files)
  var entries = {}
  files.forEach(entry => {
    const pathArr = entry.split('/')
    const fileName = pathArr[pathArr.length - 2]
    entries[fileName] = ['babel-polyfill', entry]
  })
  console.log(entries)
  return entries
}

glob.sync(rootPath + 'src/page/**/*.html').forEach(entry => {
  const pathArr = entry.split('/')
  const fileName = pathArr[pathArr.length - 2]
  const config = {
    filename: './' + fileName + '.html', //生成的html存放路径，相对于path
    template: rootPath + 'src/page/' + fileName + '/index.html', //html模板路径
    inject: 'body', //js插入的位置，true/'head'/'body'/false
    hash: true, //为静态资源生成hash值
    chunks: ['vendors', fileName],//需要引入的chunk，不配置就会引入所有页面的资源
    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: false //删除空白符与换行符
    }
  }
  HtmlWebpackPlugins.push(new HtmlWebpackPlugin(config))
})

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-1']
          }
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './config/postcss.config.js'
                }
              }
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./[name].css'),
    new CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: Object.keys(entries),
      minChunks: Object.keys(entries).length
    }),
    new UglifyJsPlugin({ //压缩代码
      compress: {
        warnings: false
      },
      except: ['$super', '$', 'exports', 'require'] //排除关键字
    }),
    ...HtmlWebpackPlugins
  ]

}
