- 如果一个元素具有BFC，则不管内部子元素再怎么翻江倒海，既不会影响外部的元素也不会受外部元素的影响
- 触发BFC,只要满足任一条件，就无须使用clear:both去清除浮动
	- `<html>`根元素
	- float的值不为none
	- overflow的值为 auto、scroll、hidden
	- display的值为 table-cell、tabel-caption、inline-block
	- position不为relative、static
- 设置间隙技巧：设置透明的border，例如`border-left: 10px solid transparent`

