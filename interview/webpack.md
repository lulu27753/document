## 问题

- webpack解决什么问题
- file-loader 和 url-loader 的区别
- 使用哪些插件
- module | chunk | bundle的区别


## webpack解决什么问题

- 文件依赖管理（模块开发）
- 资源加载管理（顺序和数量|合并与嵌入）
- 效率与优化（CSS和图片的处理，部署与假数据）：loaders + plugins

> 配置对象
- entry
- ouput
- module
- plugins

![webpack打包过程](/assets/webpack打包过程.png)

## file-loader 和 url-loader 

### 相同点

- 静态资源（图片|字体）引入解决方案

### 不同点

- url-loader 封装了 file-loader，但没有依赖关系
- url-loader 中当资源大小大于limit时会调用file-loader，小于limit时bDataURL（base64码）
- file-loader 返回的是public URL

## 使用哪些插件

- HtmlwebpackPlugin：会自动生成一个html文件

- ExtractTextPlugin：提取 css

- CopyWebpackPlugin：复制文件和文件夹的插件

- commonChunkPlugin：提取公共业务代码与第三方类库代码

- FriendlyErrorsPlugin：webpack错误信息提示插件

- webpack.NamedModulesPlugin：更容易查看要修补(patch)的依赖

- webpack.HotModuleReplacementPlugin：热加载插件

- webpack.DefinePlugin：接收字符串插入到代码当中

- CleanWebpackPlugin：清除dist文件夹，保证每次build的文件都是最新的

- webpack.DllReferencePlugin：单独编译更改不频繁的代码

- BundleAnalyzerPlugin: 包分析插件

- HashedModuleIdsPlugin：稳定 ModuleId 


