## output

### output.path

* 默认值：process.cwd()
* 只是指示输出的目录，对应一个**绝对路径**
* `output: {path: path.resolve(__dirname, '../dist'),}`

### output.publicPath

* 默认值：空字符串
* 帮助你为项目中的所有资源指定一个基础路径，它被称为公共路径(`publicPath`)
* 所有资源的基础路径: 项目中引用css，js，img等资源时候的一个基础路径,要配合具体资源中指定的路径使用
* `静态资源最终访问路径 = `output.publicPath` + 资源loader或插件等配置路径`
* 静态资源最终访问路径: 在使用`html-webpack-plugin`打包后得到的html中可以看到
* 相对路径: 相对于`build`之后的`index.html`(如果设置`publicPath: './dist/'`，则打包后js的引用路径为`./dist/build.js`)
* 将`publicPath`设置成/,则打包后访问路径为`localhost:8080/dist/main.js`，本地无法访问
* 一般情况下publicPath应该以'/'结尾，而其他loader或插件的配置不要以'/'开头


```js
output.publicPath = '/dist/'

// image
options: {
 	name: 'img/[name].[ext]?[hash]'
}

// 最终图片的访问路径为
output.publicPath + 'img/[name].[ext]?[hash]' = '/dist/img/[name].[ext]?[hash]'

// js output.filename
output: {
	filename: '[name].js'
}
// 最终js的访问路径为
output.publicPath + '[name].js' = '/dist/[name].js'

// extract-text-webpack-plugin css
new ExtractTextPlugin({
	filename: 'style.[chunkhash].css'
})
// 最终css的访问路径为
output.publicPath + 'style.[chunkhash].css' = '/dist/style.[chunkhash].css'
```
## webpack-dev-server中的publicPath

* 在开发阶段，我们借用devServer启动一个开发服务器进行开发，这里也会配置一个publicPath
* webpack-dev-server中的publicPath路径下的打包文件可以在浏览器中访问。而静态资源仍然使用output.publicPath
* webpack-dev-server打包的内容是放在内存中的，这些打包后的资源对外的的根目录就是publicPath
* 通过访问 `http://localhost:8080/webpack-dev-server `可以得到devServer启动后的资源访问路径，点击静态资源可以看到静态资源的访问路径为 `http://localhost:8080${publicPath}index.html`

```
// 假设devServer的publicPath为
const publicPath = '/dist/'
// 则启动devServer后index.html的位置为
const htmlPath = `${pablicPath}index.html`
// 包的位置
cosnt mainJsPath = `${pablicPath}main.js`
```
以上可以直接通过http://lcoalhost:8080/dist/main.js访问到

## html-webpack-plugin中的会受到路径影响的属性

### template

* 作用：用于定义模版文件的路径
* 源码：`this.options.template = this.getFullTemplatePath(this.options.template, compiler.context);`
* 因此template只有定义在**webpack的context**下才会被识别，`webpack context`的默认值为`process.cwd()`，即运行 node 命令时所在的文件夹的绝对路径

### filename

* 作用：输出的HTML文件名，默认为index.html，可以直接配置带有子目录
* 源码：`this.options.filename = path.relative(compiler.options.output.path, filename);`
* 所以filename的路径是相对于output.path的，而在webpack-dev-server中，则是相对于webpack-dev-server配置的publicPath。
* 如果webpack-dev-server的publicPath和output.publicPath不一致，在使用html-webpack-plugin可能会导致引用静态资源失败，因为在devServer中仍然以output.publicPath引用静态资源，和webpack-dev-server的提供的资源访问路径不一致，从而无法正常访问。
* 有一种情况除外，就是output.publicPath是相对路径，这时候可以访问本地资源
* 所以一般情况下都要保证devServer中的publicPath与output.publicPath保持一致。

## 路径

### 斜杠

配置中`/`代表url根路径：（例如http://localhost:8080/dist/js/test.js中的http://localhost:8080/）

### devServer

* devServer.contentBase 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
* devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。

### node中的路径

文件结构：
```bash
app/
    -lib/
        -common.js
    -model
        -task.js
        -test.js
```

task.js

```js
var path = require('path');

console.log(__dirname); // 
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));
```

在 model 目录下运行 node task.js 得到的输出是：

```bash
/Users/guo/Sites/learn/app/model
/Users/guo/Sites/learn/app/model/task.js
/Users/guo/Sites/learn/app/model
/Users/guo/Sites/learn/app/model
```
在 app 目录下运行 node model/task.js，得到的输出是：

```bash
/Users/guo/Sites/learn/app/model
/Users/guo/Sites/learn/app/model/task.js
/Users/guo/Sites/learn/app
/Users/guo/Sites/learn/app
```

#### 绝对路径

* `__dirname`: 总是返回被执行的 js 所在文件夹的绝对路径
* `__filename`: 总是返回被执行的 js 的绝对路径
* `process.cwd()`: 总是返回运行 node 命令时所在的文件夹的绝对路径

#### 相对路径

* ./ : 在 require() 中使用是跟 `__dirname` 的效果相同，不会因为启动脚本的目录不一样而改变，在其他情况下跟 process.cwd() 效果相同，是相对于启动脚本所在目录的路径。
* ../

require的路径必须是相对于当前执行文件的,只有在 require() 时才使用相对路径(./, ../) 的写法，其他地方一律使用绝对路径，如下：

```bash
// 当前目录下
path.dirname(__filename) + '/test.js';
// 相邻目录下
path.resolve(__dirname, '../lib/common.js');
```





























