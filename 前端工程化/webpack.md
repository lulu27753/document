* '热加载'并不代表'热替换'
    * --inline:为入口页面添加“热加载”功能
    * --hot；开启“热替换”，即尝试重新加载组件改变的部分(而不是重新加载整个页面)
    * 同时配置两个参数：当资源改变时，将会先尝试HRM，如果失败则重新加载整个入口页面
* publicPath：则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
* --open:自动打开浏览器窗口
* --history-api-fallback:所有路由都会指向index.html
* externals:如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用。假设：我们开发了一个自己的库，里面引用了lodash这个包，经过webpack打包的时候，发现如果把这个lodash包打入进去，打包文件就会非常大。那么我们就可以使用externals的方式引入。
    * 不同环境设置externals方式
        * Node：添加前缀commonjs2或者commonjs
        * AMD：添加前缀amd
        * 浏览器：不用添加什么前缀，默认设置就是global
    * 和libraryTarget的关系
        * libraryTarget配置如何暴露 library。如果不设置library,那这个library就不暴露。就相当于一个自执行函数
        * externals是决定的是以哪种模式去加载所引入的额外的包
        * libraryTarget决定了你的library运行在哪个环境，哪个环境也就决定了你哪种模式去加载所引入的额外的包。也就是说，externals应该和libraryTarget保持一致。library运行在浏览器中的，你设置externals的模式为commonjs，那代码肯定就运行不了了。
        * 如果是应用程序开发，一般是运行在浏览器环境libraryTarget可以不设置，externals默认的模式是global，也就是以全局变量的模式加载所引入外部的库。