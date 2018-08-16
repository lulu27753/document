* 切换目录

cd dir_name #切换到dir_name目录
cd - 返回前一次的目录
cd ~返回当前用户的home目录
cd ..返回上一层目录

* ls #查看当前目录下的所有文件和文件夹列表

ls -lha #查看包含'.'开始的隐藏文件和文件夹,以及详细的权限和创建时间,大小等信息
ls -ld #加一个-d参数,可查看当前目录的信息

* 复制文件

cp src_file to_path# 将src_file复制到to_path
cp -r src_dir to_dir #加-r参数可以复制目录

* 移动文件

mv source_dir dest_dir #命令移动目录位置,也可以重命名目录名字

* 删除文件

rm -r $dir_name #可删除整个目录
rm -f xxx #强制删除,不会给出提示对话框

* 中断命令行程序
* 在文本中搜索文本
* 搜索文件和目录
* 把命令链在一起
* 重定向输出
* “冻结”终端
* “解冻”终端
*  安装软件

```bash
redhat/centos: yum install xxxx
debain/ubuntu: apt-get install xxx
```

* man cmd_name 查看命令的使用说明帮助文档,非常实用

eg. man ls 查看ls命令的使用说明

* which -a cmd_name #会在PATH环境变量里面的目录寻找命令的绝对路径

* du -sh $dir_name #显示当前目录的磁盘占用空间

du -d1 -h $dir_name #显示当前目录下第一层子目录的磁盘占用空间信息

* mkdir $dir_name #创建一个目录

mkdir {dir1,dir2,dir3} #同时创建3个目录

* sudo lsof -i -P | grep -i "listen" # 查看所有进程监听的端口

* kill $pid # 结束一个进程

kill -9 $pid # 强制结束一个进程

* clear # 清空terminal屏幕

* netstat # 查看本机网络连接信息

netstat --help 查看命令说明
netstat -ant 查看所有的tcp连接信息
netstat -tnl 查看tcp listening的端口情况

* ctrl+r #可以搜索历史命令

* top #命令可查看当前系统负载,cpu使用率,内存,以及进程信息.默认top命令是动态更新的

top -p pid #可查看指定pid的进程运行信息
top -Hp pid #可列举指定pid进程里面的所有线程运行信息

* ps #命令也是查看系统进程信息的,查看的是一份静态的快照

ps aux #查看系统所有的进程信息 
ps pid #查看指定进程信息的一份快照

* tar #打包,解压命令

tar -xvf xxx.tar.gz #解压一个压缩包 
tar -cvzf xxx.tar.gz xxx #压缩一个文件夹(xxx)


## shell的基本知识

* shell可以执行：内部命令 | 应用程序 | shell脚本

* shell可以做以下事情：
	* 命令行解释
	* 命令的多种执行顺序
	* 通配符
	* 命令补全、别名机制、命令历史
	* I/O重定向
	* 管道
	* 命令替换
	* Shell编程语言（Shell Script）
	
* type命令可以区分 内部命令 和 外部命令
* ps 命令观察正在执行的shell

## Linux目录树结构

* /
	* **bin**: 存放二进制可执行文件(ls, cat, mkdir等)
	* boot: 存放用于系统引导时使用的各种文件
	* dev: 用于存放设备文件
	* **etc**: 存放系统配置文件
	* home: 存放所有用户文件的根目录
	* lib: 


























