## 快速开始

```bash
sudo npm i ydoc -g
mkdir project && cd project
ydoc serve
ydoc init # 初始化,生成docs目录
ydoc build # 构建，生成_site目录
```
> http://127.0.0.1:9999

## 目录结构

- index.jsx: 首页
- NAV.md: 导航
- book/index.md: 文档页首页
- book/SUMMARY.md: 文档目录，生成html文件的目录

## NAV.md

```
# YDoc
![logo](ydoc/images/logo.png)

## 文档
* [教程](/documents/index.md)
* [规范](/style-guide/index.md))
---
* [插件](/plugins/index.md)
```

## 首页

### banner

- name: 标语标题
- desc：标语描述信息
- btns：按钮组，可设置多个按钮
- caption：说明信息，例如“当前版本信息”
- btns[n].name: 按钮名称
- btns[n].href：按钮链接
- btns[n].primary：是否为主按钮

### features

- features[n].name: 特性名称
- features[n].desc: 特性描述

### footer

- copyRight: 版权信息
- copyRight.name: 版权主体名称
- copyRight.href: 版权主体链接
- links: 友情链接
- links.xxx: 链接组标题
- links.xxx[n]: 链接项
- links.xxx[n].name: 链接项名称
- links.xxx[n].name: 链接项链接

## 文档页

文件夹(书) = SUMMARY.md(目录) + 页面(md文档)

```
# 目录

### 章节 1

* [快速开始](start.md)
  * [安装](installation.md)
* [项目设置](setting.md)
  * [配置文件](config.md)

### 章节 2

* [API](api.md)
  * [a](api.md#a)
  * [b](api.md#b)
```

## 自定义页面

支持.md | .jsx | .html 三种类型

## 配置文件

ydoc.json

|变量| 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| root  | String | docs | 文档目录 |
| title | String | ydoc | 网站标题 |
| keywords | String | ydoc|  网站关键字|
| author | String |  ymfe | 网站作者 |
| description | String | \_site | 网站生成路径 |
| plugins | Array  | [] |插件列表  |
| pluginsConfig | Object |null |插件配置 |

```
{
  "plugins": ["demo"],
  "pluginsConfig": {
    "demo": {
      "title": "demo"
    }
  }
}
```
## 主题

[theme](https://github.com/YMFE/ydoc/tree/master/theme)

## 文档规范

### 文档结构

- 简介（Introduction）： [必备] [文件] 提供对产品和文档本身的总体的、扼要的说明
- 快速上手（Getting Started）：[可选] [文件] 如何最快速地使用产品
- 入门篇（Basics）： [必备] [目录] 又称”使用篇“，提供初级的使用教程
	- 环境准备（Prerequisite）：[必备] [文件] 软件使用需要满足的前置条件
	- 安装（Installation）：[可选] [文件] 软件的安装方法
	- 设置（Configuration）：[必备] [文件] 软件的设置
- 进阶篇（Advanced)：[可选] [目录] 又称”开发篇“，提供中高级的开发教程
- API（Reference）：[可选] [目录|文件] 软件 API 的逐一介绍
- FAQ：[可选] [文件] 常见问题解答
- 附录（Appendix）：[可选] [目录] 不属于教程本身、但对阅读教程有帮助的内容
	- Glossary：[可选] [文件] 名词解释
	- Recipes：[可选] [文件] 最佳实践
	- Troubleshooting：[可选] [文件] 故障处理
	- ChangeLog：[可选] [文件] 版本说明
	- Feedback：[可选] [文件] 反馈方式

### 文件名

- 必须使用半角字符，不得使用全角字符
- 只使用小写字母，不使用大写字母
- 某些说明文件的文件名，可以使用大写字母
- 不使用`advanced_usage.md`，而使用`advanced-usage.md`

## 资源

[ydoc](https://ydoc.ymfe.org/index.html)

[styleguidist](https://github.com/styleguidist/react-styleguidist)

[ydoc-plugin-vue-styleguide](https://www.npmjs.com/package/ydoc-plugin-vue-styleguide)

[Vue Styleguidist](https://github.com/vue-styleguidist)

[YAML 语言教程 - 阮一峰](http://www.ruanyifeng.com/blog/2016/07/yaml.html)

[YMFE - 去哪儿大前端团队](https://ymfe.org/projects.html)

[noox: The best template engine for JavaScript, base on React Jsx](https://github.com/hellosean1025/noox)

[Favicon Generator for all platforms: iOS, Android, PC/Mac...](https://realfavicongenerator.net/)

[Youth Design 介绍-设计](https://ued.qunar.com/youth-design/design/index.html)
