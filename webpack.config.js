const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const glob = require('glob')

function getEntry(globPath, pathDir) {
  var files = glob.sync(globPath)
  var entries = {}, dirname, basename, pathname, extname
  files.forEach(entry => {
    dirname = path.dirname(entry)
    extname = path.extname(entry)
    basename = path.basename(entry, extname)
    pathname = path.join(dirname, basename)
    pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname

    entries[pathname] = path.resolve(__dirname, './' + entry)
  })
  return entries
}

const entries = getEntry('src/page/*', 'src/page/')
console.log(entries)



module.exports = {
  // entry: {
  //   'app1': path.resolve(__dirname, './src/page/app1'),
  //   'app2': path.resolve(__dirname, './src/page/app2')
  // },
  entry: entries,
  output: {
    path: path.resolve(__dirname, './build'),
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
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  devServer: {
    inline: true,
    disableHostCheck: true,
    port: 8088,
    contentBase: './'
  },
  plugins: [
    new ExtractTextPlugin('styles/[name].css'),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      filename: './app1.html', //生成的html存放路径，相对于path
      template: './src/page/app1/index.html', //html模板路径
      inject: 'body', //js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      chunks: ['app1'],//需要引入的chunk，不配置就会引入所有页面的资源
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      filename: './app2.html', //生成的html存放路径，相对于path
      template: './src/page/app2/index.html', //html模板路径
      inject: 'body', //js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      chunks: ['app2'],//需要引入的chunk，不配置就会引入所有页面的资源
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    })
  ]

}
