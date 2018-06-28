## Shell常用特殊变量

变量  含义
`$0`  当前脚本的文件名
`$n`  传递给脚本或函数的参数。n 是一个数字，表示第几个参数。例如，第一个参数是$1，第二个参数是$2
`$#`  传递给脚本或函数的参数个数
`$*`  传递给脚本或函数的所有参数
`$@`  传递给脚本或函数的所有参数。被双引号(” “)包含时，与 $* 稍有不同
`$?`  上个命令的退出状态，或函数的返回值。成功返回0，失败返回1
`$$`  当前Shell进程ID。对于 Shell 脚本，就是这些脚本所在的进程ID

* `$*` 和 `$@` 都是将参数一个一个返回 
* `"$*"`将所有参数当做一个整体字符串返回

## 常用判断参数

```bash
-a file exists.
-b file exists and is a block special file.
-c file exists and is a character special file.
-d file exists and is a directory.
-e file exists (just the same as -a).
-f file exists and is a regular file.
-g file exists and has its setgid(2) bit set.
-G file exists and has the same group ID as this process.
-k file exists and has its sticky bit set.
-L file exists and is a symbolic link.
-n string length is not zero.
-o Named option is set on.
-O file exists and is owned by the user ID of this process.
-p file exists and is a first in, first out (FIFO) special file or named pipe.
-r file exists and is readable by the current process.
-s file exists and has a size greater than zero.
-S file exists and is a socket.
-t file descriptor number fildes is open and associated with a terminal device.
-u file exists and has its setuid(2) bit set.
-w file exists and is writable by the current process.
-x file exists and is executable by the current process.
-z string length is zero.
```

## 判断命令

命令  含义
-eq 等于
-ne 不等于
-gt 大于
-lt 小于
ge  大于等于
le  小于等于

