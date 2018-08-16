- overflow 兼容性问题
	- chrome: 容器可滚动，padding-bottom也算在滚动尺寸之内
	- IE和 Firefox 会忽略 padding-bottom
	- 同时会导致scrollHeight值不一样
	- 解决方案：如果需要留有间隙，则使用透明边框











