# 响应式设计（Responsive web design)

[终端设备参数](https://material.io/devices/)

## 协作

手淘设计师和前端开发的适配协作基本思路：

+ 选择一种尺寸作为设计和开发基准
+ 定义一套适配规则，自动适配剩下的两种尺寸(其实不仅这两种，你懂的)
+ 特殊适配效果给出设计效果
![1](./assets/rem-6.jpg)

## 图片

+ 背景图片
    + media query在不同的屏幕下调用不同的图像
    + 换不同分辨率的图片（在不支持background image size的浏览器中）
    + 通过image-set实现Retina屏幕下的图像显示
+ img标签引入
    + 加载不同分辨率的图片（延迟加载：在加载图片之前用JS检查窗口宽度）
    + 使用img的srcset属性调用不同的图像
    + 使用\<picture>标签元素根据不同的屏幕调用不同的图像
