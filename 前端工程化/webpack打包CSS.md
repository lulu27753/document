## 抽离CSS

* 安装
    * `npm install extract-text-webpack-plugin --save-dev`
    * `yarn add extract-text-webpack-plugin`

* 配置

```javascript
var Ex = require('extract-text-webpack-plugin');
// ...省略
module: {
  loaders: [{
    test: /\.less/,
    loader: Ex.extract('style-loader', 'css-loader','less-loader')  // 单独打包出CSS，这里配置注意下
  }]
},
plugins: [
  new Ex("【name】.css")
]
```

## 单个页面单独打包CSS

即一个应用多个Css文件
* 打包一个文件，只需要常规的在入口的js文件引用 css文件即可
* 打包成多个CSS文件，可以设置多个CSS入口，让webpack用 loader去打包。 和分割单独打包js文件一样。

```javascript
// webpack 3.x 的配置
var path = require('path')
var glob = require('globby')  
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// CSS入口配置
var CSS_PATH = {
  css: {
    pattern: ['./src/**/[^_]*.less', '!./src/old/**/*.less'],
    src: path.join(__dirname, 'src'),
    dst: path.resolve(__dirname, 'static/build/webpack'),
  }
}

// 遍历除所有需要打包的CSS文件路径
function getCSSEntries(config) {
  var fileList = glob.sync(config.pattern)
  return fileList.reduce(function (previous, current) {
    var filePath = path.parse(path.relative(config.src, current))
    var withoutSuffix = path.join(filePath.dir, filePath.name)
    previous[withoutSuffix] = path.resolve(__dirname, current)
    return previous
  }, {})
}

module.exports = [
  {
    devtool: 'cheap-module-eval-source-map',
    context: path.resolve(__dirname),
    entry: getCSSEntries(CSS_PATH.css),
    output: {
      path: CSS_PATH.css.dst,
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'postcss-loader', 'less-loader']
          })
        }
      ]
    },
    resolve: {
      extensions: ['.less']
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
    ]
  },
// 如果还需要打包js，则可以在这里增加一个单独打包js的处理【根据自己需求来】
// {
//    entry:{},
//    output:{},
//    ... 省略
// }
]
```