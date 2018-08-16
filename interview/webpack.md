## 问题

- fileloader 和 urlloader 的区别
- 使用哪些插件

## file-loader 和 url-loader 

### 相同点

- 静态资源（图片|字体）引入解决方案

### 不同点

- url-loader 封装了 file-loader，但没有依赖关系
- url-loader 中当资源大小大于limit时会调用file-loader，小于limit时bDataURL（base64码）
- file-loader 返回的是public URL

## 使用哪些插件

- HtmlwebpackPlugin：会自动生成一个html文件
- CopyWebpackPlugin：复制文件和文件夹的插件
- FriendlyErrorsPlugin：webpack错误信息提示插件
- webpack.NamedModulesPlugin：更容易查看要修补(patch)的依赖
- webpack.HotModuleReplacementPlugin：热加载插件
- webpack.DefinePlugin：接收字符串插入到代码当中
- CleanWebpackPlugin：清除dist文件夹，保证每次build的文件都是最新的
- ExtractTextPlugin：提取 css
- webpack.DllReferencePlugin：单独编译更改不频繁的代码
- BundleAnalyzerPlugin: 包分析插件


