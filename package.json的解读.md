# package.json的解读

## json和JS对象的区别

package.json，顾名思义，它是一个json文件，而不能写入JS对象。
所以我们首先要搞懂的是JSON和JS对象的区别：

| 区别 | Json | Javascript对象 |
|----|------|--------------|
| 含义 | 仅仅是一种数据格式| 表示类的实例|
|传输|可以跨平台数据传输，速度快|不能传输|
|表现|1、键值对方式，键必须加双引号</br>2、值不能是方法函数，不能是undefined\|NaN|1、键值对方式，键不加引号</br>2、值可以是函数、对象、字符串、数字、boolean等</br>|
|相互转换|Json转化为JS对象：</br>1、JSON.parse(jsonstring);</br>2、json=eval("("+jsonstring+")")|JS对象转换为JSON:</br>JSON.stringify(json)|

【注意】 在JSON中属性名一定要加上双引号

## name字段

**name字段的限制**

+ name字段必须小于214字符（这个没什么好记的～）
+ name字段不能包含有“.”符号和下划线（这个要记一下哦～）
+ name字段不能包含有大写字母（这个要记一下哦～）
+ name字段不能含有非URL安全的字符，因为它将当发布的时候，它将作为你的包的相关信息被写入URL中
那么，有哪些算是非URL安全的字符呢？咱们看表说话：
![]()

