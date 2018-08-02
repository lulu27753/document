# 

评判一个应用的规模：不应该使用代码行数来作为评判标准，而是应该以代码中模块的数量和模块之间的依赖关系来评判。
大规模：需要众多开发者一同维护且具有一定复杂度的程序。

TS是JS的超集：任何合法的JS都是合法的TS(很少有例外)

设计时代码(design time code):设计程序时编写的代码
运行时代码(runtime code):TS代码编译后执行的JS代码

## TS组件

三层：
1.VS所属语言服务 + 适配VS部分(shims.ts)
2.语言服务(services.ts) + 独立的TS编辑器(tsc.ts)
3.TS编译器核心(core.t | program.ts | scanner.ts | parser.ts | checker.ts | emitter.ts)

语言层：实现所有TS的语言特性
编译层：执行编译|类型检查，然后将TS代码转换成JS代码
语言服务层：代码检查与提示服务

