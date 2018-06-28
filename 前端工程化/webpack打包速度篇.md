# Webpack 打包优化之速度篇

## 减小文件搜索范围

如果能使得 `Webpack` 更快寻找到目标模块，将对打包速度产生积极的影响。
于此，我们需要做的即：减小文件搜索范围，从而提升速度；

### 配置 `resolve.modules`及`alias`

```javascript
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'react$': 'react/dist/react.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      // ...
      'store': resolve('src/store')
    }
  },
  ...
}
```

### 设置 `test & include & exclude`

Webpack 的装载机(loaders)，允许每个子项都可以有以下属性：

>test：必须满足的条件（正则表达式，不要加引号，匹配要处理的文件</br>
exclude：不能满足的条件（排除不处理的目录)</br>
include：导入的文件将由加载程序转换的路径或文件数组（把要处理的目录包括进来</br>
loader：一串“！”分隔的装载机（2.0版本以上，”-loader”不可以省略</br>
loaders：作为字符串的装载器阵列</br>

对于`include`，精确指定要处理的目录，可以减少不必要的遍历，从而减少性能损失。同样，对于已经明确知道的，不需要处理的目录，则应该予以排除，从而进一步提升性能。假设你有一个第三方组件的引用，它肯定位于`node_modules`，通常它将有一个 `src` 和一个 `dist` 目录。如果配置 `Webpack` 来排除 `node_modules`，那么它将从 `dist`已经编译的目录中获取文件。否则会再次编译它们。故而，合理的设置 `include & exclude`，将会极大地提升 `Webpack` 打包优化速度

```javascript
  module: {
    rules: [
      // exclude 排除，不需要编译的目录
      {
        test: /\.(jsx|js)$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        // exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(png|svg|jpg|gif|webp|ico)$/,
        use: [
           'file-loader'
         ],
         exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10000
          }
        }],
        include: path.resolve(__dirname, 'assets/fonts')
      },
      {
        test: /\.(jsx|js)$/,
        use: 'eslint-loader',
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  }
```

## 增强代码压缩工具

`Webpack` 默认提供的 `UglifyJS`插件，由于采用单线程压缩，速度颇慢 ；推荐采用 `webpack-parallel-uglify-plugin` 插件，它可以并行运行 `UglifyJS` 插件，更加充分而合理的使用 CPU 资源，这可以大大减少的构建时间；当然，该插件应用于生产环境而非开发环境，其做法如下，

```javascript
new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  sourceMap: true
})
```

替换如上自带的 UglifyJsPlugin 写法为如下配置即可：

```javascript
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
new ParallelUglifyPlugin({
  cacheDir: '.cache/',
  uglifyJS:{
    output: {
      comments: false
    },
    compress: {
      warnings: false
    }
  }
})
```

当然也有其他同类型的插件，比如：`webpack-uglify-parallel`，但根据自己实践效果来看，并没有 `webpack-parallel-uglify-plugin` 表现的那么卓越，有兴趣的朋友，可以更全面的做下对比，择优选用。需要额外说明的是，`webpack-parallel-uglify-plugin` 插件的运用，会相对 `UglifyJsPlugin` 打出的包，看起来略大那么一丢丢(其实可以忽略不计)；如果在你使用时也是如此，那么在打包速度跟包体积之间，应该有自己的抉择。

## 用 `Happypack` 来加速代码构建

`Webpack` 中为了方便各种资源和类型的加载，设计了以 `loader` 加载器的形式读取资源，但是受限于 `nodejs` 的编程模型影响，所有的 `loader` 虽然以 `async` 的形式来并发调用，但是还是运行在单个 `node` 的进程，并在同一个事件循环中，这就直接导致了一些问题：当同时读取多个`loader`文件资源时，比如 `babel-loader`需要 `transform` 各种`jsx`，`es6`的资源文件。在这种同步计算同时需要大量耗费 `cpu` 运算的过程中，`node`的单进程模型就无优势了，而 `Happypack` 就是针对解决此类问题而生的存在。

```javascript
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module: {
  loaders: [
    {
      test: /\.js[x]?$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      loader: 'happypack/loader?id=happybabel'
    }
  ]
},
plugins: [
  new HappyPack({
    id: 'happybabel',
    loaders: ['babel-loader'],
    threadPool: happyThreadPool,
    cache: true,
    verbose: true
  })
]

```

## 设置 babel 的 cacheDirectory

`babel-loader is slow! ` 所以不仅要使用`exclude、include`，尽可能准确的指定要转化内容的范畴，而且要充分利用缓存，进一步提升性能。`babel-loader` 提供了 `cacheDirectory`特定选项（默认 `false`）：设置时，给定的目录将用于缓存加载器的结果。
未来的 `Webpack` 构建将尝试从缓存中读取，以避免在每次运行时运行潜在昂贵的 `Babel` 重新编译过程。如果值为空（`loader: ‘babel-loader?cacheDirectory’`）或`true`（`loader: babel-loader?cacheDirectory=true`），`node_modules/.cache/babel-loader` 在任何根目录中找不到对应的文件夹时，加载程序将使用默认缓存目录或回退到默认的OS临时文件目录。实际使用中，效果显著.配置示例如下：

```javascript
rules: [
  {
    test: /\.js$/,
    loader: 'babel-loader?cacheDirectory=true',
    exclude: /node_modules/,
    include: [resolve('src'), resolve('test')]
  },
  ... ...
]
```

## 设置 noParse

当确定一个模块中不会有其它新的依赖，就可以配置这项。 Webpack 将不再扫描这个文件中的依赖，这对于比较大型类库，将能促进性能表现，具体可以参见以下配置：

```javascript
module: {
  noParse: /node_modules\/(element-ui\.js)/,
  rules: [
    {
      ...
    }
}

```

## 参考资料

[HappyPack原理解析](https://taobaofed.org/blog/2016/12/08/happypack-source-code-analysis/)
