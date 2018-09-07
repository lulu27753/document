# webpack_deploy走过的坑

## 路径问题

**webpack打包处理方式的不一**

通过img标签引入的图片：
css引入的图片：
抽离出的css文件、build文件、vendor文件本身：
抽离出的css文件、build文件、vendor文件里面引用的资源路径：

## build时的路由问题（BrowserRouter和HashRouter的区别）

## webpack-dev-server中的contentBase什么情况下需要配置的问题

## package的betterScripts配置

[package.json的解读](./package.json的解读.md)

## 路径问题

webpack的bug导致如果本地开发目录路径不一致，编译出来的md5会不一致。所以推荐使用服务器构建。通过配置路径alias+path模块的绝对路径方法

## 资源
[webpack 热加载原理探索](http://shepherdwind.com/2017/02/07/webpack-hmr-principle/)
[请手写一个webpack4.0配置](https://juejin.im/post/5b4609f5e51d4519596b66a7)
[释放webpack的真正潜力](https://mp.weixin.qq.com/s/nfbrDtuVCvWREIR-3QvYGA)
