## cli 工具需要满足的需求

1. 获得用户的输入，并且根据相应的输入，可以定制编程相应执行逻辑
2. 模板代码有两种实现思路，一是采用代码生成，二是分离静态资源模板
3. 使用包管理工具

## 创建和配置主入口文件

package.json
```json
"bin": {
    "node-cli": "bin/index.js"
  }
```
* node-cli: 需要执行的命令名
* bin/index.js: 命令所调用的文件

## 编写命令文件

bin/index.js

```java
#!/usr/bin/env node  // 一定要加上这句话，要不然执行命令时无法识别出该文件是可执行命令
console.log('my first cli');
```

## 执行

打开命令行工具，进入当前开发文件夹,输入命令bin/index.js，即可以输出“my first cli”

我们如何像发布后一样，直接输node-cli命令就可以调用我们的主文件呢？

在开发目录执行`sudo npm link`将模块链接到全局，如想去掉 link，执行`sudo npm unlink`

## 推荐包

### commander

[commander.js](https://github.com/tj/commander.js)

commander是目前很成熟的Node命令行交互接口实现工具，使用该工具可以很便捷很快速地实现第一点需求

### git-clone

git-clone是一个很轻量的Node编写的git clone封装，可以很便捷很快速地从github上克隆执行项目模板。也就是说，我们将项目模板静态存储在github上，每当执行cli命令时，将其下载，这样我们就很轻松地得到了项目代码模板。另外，当需要改变项目模板代码时，只需要修改github上的项目代码就可以，cli工具无需修改

### shelljs

shelljs同样是一个很轻量的Node编写的系统命令封装，可以很便捷很快速地在Node代码中使用系统命令。在本例中，因为从github上下载的项目代码会带有.git文件，需要使用rm命令将其删除

### chalk 

用于高亮终端打印出来的信息

### request

发送http请求的工具


## talk is cheap



## 参考资料

[npm link](https://github.com/atian25/blog/issues/17)


















