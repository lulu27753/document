* Node:一种新型Web服务器
    * 搭建和配置非常容易
    * Node是单线程的
    * 平台无关性
* Node开发的出现带动了一种新式的数据库存储方式，“文档数据库”或“键/值对数据库”，MongoDb是其中的佼佼者
* 确定项目中每个依赖项的授权的npm包：license-sniffer | license-spelunker
* npm包全局安装，如果你的用户名中有空格，很多包都会有问题
* 切换多个版本的Node：nvm
* node只是提供了一个构建web服务端的框架，所以需要自己编写web服务器
* process.memoryUsage()
	* 堆外内存：buffer，不受GC控制，
	* 打日志，log.js
* 句柄
* -smi
* trace_gc
虚拟机实现，内存分区，新生代minor，老生代major globalGC
* max_executable_size
* max_old_space_size
* prof

* Buffer
	* 不受GC控制
	* 流的转换 | 大字符的读写
	* 图片 | 文件的上传下载
	* 8k问题

* http
	* Server: 前端
	* Agent: keepAlive(可能有问题)

* urllib
	* 请求
	* 实现回调函数

* vm(虚拟机)

