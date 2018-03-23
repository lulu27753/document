## 目录结构

* .json 后缀的 JSON 配置文件
    * app.json：对当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等
        * pages字段 —— 用于描述当前小程序所有页面路径，这是为了让微信客户端知道当前你的小程序页面定义在哪个目录。
        * window字段 —— 小程序所有页面的顶部背景颜色，文字颜色定义在这里的。
    * project.config.json：开发者工具的个性化配置
    * pages/logs/logs.json（page.json）：独立定义每个页面的一些属性
* .wxml 后缀的 WXML 模板文件：类似 HTML
    * wx: 开头的属性
    * 数据绑定{{}}
* .wxss 后缀的 WXSS 样式文件：
    * 尺寸单位:rpx
    * 全局样式:app.wxss
    * 局部样式 page.wxss
    * 仅支持部分 CSS 选择器
* .js 后缀的 JS 脚本逻辑文件
    * API:获取用户信息、本地存储、微信支付等
    * setData

## 配置

### app.json

属性 | 类型 | 必填 | 描述
---|----|----|---
pages | String Array | 是 | 设置页面路径
window | Object | 否 | 设置默认页面的窗口表现
tabBar | Object | 否 | 设置底部 tab 的表现
networkTimeout | Object | 否 | 设置网络超时时间
debug | Boolean | 否 | 设置是否开启 debug 模式

1、pages

* 数组的第一项代表小程序的初始页面。小程序中新增/减少页面，都需要对 pages 数组进行修改。
* 文件名不需要写文件后缀，因为框架会自动去寻找路径下 .json, .js, .wxml, .wxss 四个文件进行整合

2、window

属性 | 类型 | 默认值 | 描述 | 最低版本
---|----|-----|----|-----
navigationBarBackgroundColor | HexColor | #000000 | 导航栏背景颜色，如"#000000" | 
navigationBarTextStyle | String | white | 导航栏标题颜色，仅支持 black/white | 
navigationBarTitleText | String |  | 导航栏标题文字内容 | 
navigationStyle | String | default | 导航栏样式，仅支持 default/custom。custom 模式可自定义导航栏，只保留右上角胶囊状的按钮 | 微信版本 6.6.0
backgroundColor | HexColor | #ffffff | 窗口的背景色 | 
backgroundTextStyle | String | dark | 下拉背景字体、loading 图的样式，仅支持 dark/light | 
backgroundColorTop | String | #ffffff | 顶部窗口的背景色，仅 iOS 支持 | 微信版本 6.5.16
backgroundColorBottom | String | #ffffff | 底部窗口的背景色，仅 iOS 支持 | 微信版本 6.5.16
enablePullDownRefresh | Boolean | false | 是否开启下拉刷新，详见页面相关事件处理函数 | 
onReachBottomDistance | Number | 50 | 页面上拉触底事件触发时距页面底部距离，单位为px

3、tabBar

属性 | 类型 | 必填 | 默认值 | 描述
---|----|----|-----|---
color | HexColor | 是 |  | tab 上的文字默认颜色
selectedColor | HexColor | 是 |  | tab 上的文字选中时的颜色
backgroundColor | HexColor | 是 |  | tab 的背景色
borderStyle | String | 否 | black | tabbar上边框的颜色， 仅支持 black/white
list | Array | 是 |  | tab 的列表，详见 list 属性说明，最少2个、最多5个 tab
position | String | 否 | bottom | 可选值 bottom、top

 list 

 属性 | 类型 | 必填 | 说明
----|----|----|---
pagePath | String | 是 | 页面路径，必须在 pages 中先定义
text | String | 是 | tab 上按钮文字
iconPath | String | 否 | 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片
selectedIconPath | String | 否 | 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效

4、networkTimeout

属性 | 类型 | 必填 | 说明
---|----|----|---
request | Number | 否 | wx.request的超时时间，单位毫秒，默认为：60000
connectSocket | Number | 否 | wx.connectSocket的超时时间，单位毫秒，默认为：60000
uploadFile | Number | 否 | wx.uploadFile的超时时间，单位毫秒，默认为：60000
downloadFile | Number | 否 | wx.downloadFile的超时时间，单位毫秒，默认为：60000

### page.json

属性 | 类型 | 默认值 | 描述
---|----|-----|---
navigationBarBackgroundColor | HexColor | #000000 | 导航栏背景颜色，如"#000000"
navigationBarTextStyle | String | white | 导航栏标题颜色，仅支持 black/white
navigationBarTitleText | String |  | 导航栏标题文字内容
backgroundColor | HexColor | #ffffff | 窗口的背景色
backgroundTextStyle | String | dark | 下拉背景字体、loading 图的样式，仅支持 dark/light
enablePullDownRefresh | Boolean | false | 是否开启下拉刷新，详见页面相关事件处理函数。
disableScroll | Boolean | false | 设置为 true 则页面整体不能上下滚动；只在 page.json 中有效，无法在 app.json 中设置该项
onReachBottomDistance | Number | 50 | 页面上拉触底事件触发时距页面底部距离，单位为px

## 逻辑层(App Service)

### App()

* App() 必须在 app.js 中注册，且不能注册多个。
* 不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
* 不要在 onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
* 通过 getApp() 获取实例之后，不要私自调用生命周期函数。

属性 | 类型 | 描述 | 触发时机
---|----|----|-----
onLaunch | Function | 生命周期函数--监听小程序初始化 | 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
onShow | Function | 生命周期函数--监听小程序显示 | 当小程序启动，或从后台进入前台显示，会触发 onShow
onHide | Function | 生命周期函数--监听小程序隐藏 | 当小程序从前台进入后台，会触发 onHide
onError | Function | 错误监听函数 | 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
其他 | Any |  | 开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问

### Page()

属性 | 类型 | 描述
---|----|---
data | Object | 页面的初始数据
onLoad | Function | 生命周期函数--监听页面加载
onReady | Function | 生命周期函数--监听页面初次渲染完成
onShow | Function | 生命周期函数--监听页面显示
onHide | Function | 生命周期函数--监听页面隐藏
onUnload | Function | 生命周期函数--监听页面卸载
onPullDownRefresh | Function | 页面相关事件处理函数--监听用户下拉动作
onReachBottom | Function | 页面上拉触底事件的处理函数
onShareAppMessage | Function | 用户点击右上角转发
onPageScroll | Function | 页面滚动触发事件的处理函数
onTabItemTap | Function | 当前是 tab 页时，点击 tab 时触发
其他 | Any | 开发者可以添加任意的函数或数据到 object 参数中，在页面的函数中用 this 可以访问
