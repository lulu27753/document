## 问题

- vdom是什么？为何会存在vdom?
- vdom如何应用，核心API是什么
- 介绍一下diff算法

## vdom是什么？为何会存在vdom

- 用JS模拟DOM结构
- DOM变化的对比，放在JS层来做(图灵完备语言)
- DOM操作非常“昂贵”，提高重绘性能

- DOM操作是“昂贵”的，JS运行效率高
- 尽量减少DOM操作，而不是“推到重来“
- 项目越复杂，影响就越严重
- vdom即可解决这个问题


## 核心API

[snabbdom](https://github.com/snabbdom/snabbdom)	
[snabbdom|BootCDN](https://www.bootcdn.cn/snabbdom/)

- h(tag,attrs,children)：生成一个vnode节点
- patch(realNode, vnode)：初次渲染时
- patch(vnode, newVnode)：更新渲染时


```
var snabbdom = window.snabbdom

// 定义 patch
var patch = snabbdom.init([
	snabbdom_class,
	snabbdom_props,
	snabbdom_style,
	snabbdom_eventlisteners
])

// 定义 h
var h = snabbdom.h

// 生成 vnode

var vnode = h('div#list', {}, 'this is a div')


var container = document.getElementById('container')

patch(container, vnode)
```

## 介绍一下diff算法

- linux的基础命令，git diff等，对比的基本工具
- diff算法非常复杂，实现难度很大，源码量很大
- 去繁就简，了解核心流程，不关心细节

- DOM 操作是“昂贵”的，因此尽量减少DOM操作
- 找出本次DOM必须更新的节点来更新，其他的不更新
- 这个“找出”的过程，就需要diff算法

### diff 实现过程

- patch(container, vnode)
	- createElement
- patch(vnode, newVnode)
	- updateChildren

> 不仅仅是以上内容
- 节点新增和删除
- 节点重新排序
- 节点属性、样式、事件绑定
- 如何极致压榨性能

```
function createElement(vnode) {
	var tag = vnode.tag
	var attrs = vnode.attrs || {}
	var children = vnode.children || []
	if (!tag) {
		return null
	}

	// 创建元素
	var elem = document.createElement(tag)

	// 属性
	var attrName
	for (attrName in attrs) {
		if (attrName in attrs) {
			if (attrs.hasOwnProperty(attrName)) {
				elem.setAttribute(attrName, attrs[attrName])
			}
		}
	}

	// 子元素
	children.forEach(function(childVnode) {
		// 递归调用createElement创建子元素
		elem.appendChild(createElement(childVnode))
	})

	// 返回真实的DOM元素
	return elem
}
```
> vnode 和 newVnode 的对比

```
function updateChildren(vnode, newVnode) {
	var children = vnode.children || []
	var newChildren = newVnode.children || []

	// 遍历现有的children
	children.forEach(function(child, index) {
		var newChild = newChildren[index]
		if (newChild == null) {
			return
		}
		if (child.tag === newChild.tag) {
			// 两者 tag 一样，则继续深节点的对比
			updateChildren(child, newChild)
		} else {
			// 两者 tag 不一样, 则直接将新的字节点替换掉
			replaceNode(child, newChild)
		}
	})
}
function replaceNode(vnode, newVnode) {
	// 获取真实的DOM节点
	var elem = vnode.elem
	var newElem = createElement(newVnode)

	// 替换

}
```






































