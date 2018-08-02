## 安装

brew install mysql

## 环境变量

将mysql加入系统环境变量
进入`/usr/local/mysql/bin`,查看此目录下是否有mysql
执行`vim ~/.bash_profile`,在该文件中添加mysql/bin的目录,`PATH=$PATH:/usr/local/mysql/bin`
`source ~/.bash_profile`


## 重置密码

```bash
mysql> USE mysql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
mysql> FLUSH PRIVILEGES;
```

## 命令

```bash
mysql -u root -p # 用mysql的root账号密码登录
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('mysql123456'); # 重置账号密码
exit # 退出

```

## 资源

[Mac下安装与配置MySQL](https://www.jianshu.com/p/a8e4068a7a8a)
[MySQL文档](http://www.runoob.com/mysql/mysql-create-database.html)