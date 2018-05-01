# 1. Git 基础

>建议学习时间：1天
<!-- TOC -->

- [1. Git 基础](#1-git)
    - [1.1. 仓库](#11)
        - [1.1.1. 在现有项目中初始化仓库](#111)
        - [1.1.2. 克隆现有仓库](#112)
        - [1.1.3. 远程仓库](#113)
    - [1.2. gitignore 的格式规范](#12-gitignore)
    - [1.3. 记录更新](#13)
    - [1.4. 历史记录](#14)
    - [1.5. 撤销](#15)
    - [临时仓库（stash)](#stash)
    - [1.6. 打标签](#16)
    - [1.7. 别名](#17)
- [2. Git 分支](#2-git)
    - [2.1. 本地分支管理](#21)
    - [2.2. 分支工作流（work silos）](#22-work-silos)
    - [2.3. 远程分支管理](#23)
    - [2.4. 变基](#24)
    - [参考资料](#)

<!-- /TOC -->
## 1.1. 仓库

### 1.1.1. 在现有项目中初始化仓库

```bash
git init # 初始化仓库
```
+ Changes to be committed: 已暂存状态
+ Changes not staged for commit: 已跟踪文件发生了变化，但没有放到暂存区


### 1.1.2. 克隆现有仓库

```bash
git clone [url] [local_name] # 会克隆每个文件的每个版本
```

### 1.1.3. 远程仓库

```bash
git remote # 列出指定的每一个远程服务器的简写 -v显示与其对应的 URL
git remote add <shortname> <url> # 添加一个新的远程 Git 仓库
git fetch [remote-name] # 拉取远程仓库中你还没有的数据，不会自动合并|修改当前的工作
git pull [remote-name] [remote-branch-name] # 自动的抓取并合并远程分支到当前分支
git push [remote-name] [branch-name] # 推送数据
git remote show [remote-name] # 命令列出了当你在特定的分支上执行 git push 会自动地推送到哪一个远程分支。 它也同样地列出了哪些远程分支不在你的本地，哪些远程分支已经从服务器上移除了，还有当你执行 git pull 时哪些分支会自动合并。
git remote rm [remote-name] # 移除一个远程仓库
```

> git clone会自动将其添加为远程仓库并默认以 “origin” 为简写

```bash
# 将本地已有的仓库推送到远程
git remote add origin https://github.com/lulu27753/music_app.git
git push -u origin master
```
## 1.2. gitignore 的格式规范

+ 所有空行或以#开头的行都会被Git忽略
+ 可以使用标准的glob模式匹配
+ 匹配模式可以以（/）开头防止递归
+ 匹配模式可以以（/）结尾指定目录
+ 要忽略指定模式以外的文件和目录，可以在模式前加上（!)取反

简化的正则表达式：
+ (*) 匹配0或多个任意字符
+ [abc] 匹配任何一个列在方括号中的字符
+ (?) 只匹配一个任意字符
+ (-) 表示在这两个字符范围内的都可以匹配
+ (**) 匹配任意中间目录，比如`a/**/z` 可以匹配 a/z, a/b/z 或 `a/b/c/z`等。

## 1.3. 记录更新

```bash
git status # 检查当前文件的状态 -s状态简览
git diff # 查看未暂存的文件更新
git diff --staged # 查看已暂存的文件更新
git add *.c # 开始跟踪文件| 把已跟踪的文件放到暂存区 | 合并时把有冲突的文件标记为已解决
git rm PROJECTS.md # 记录移除文件操作 -f强制删除在暂存区的文件 --cached 删除记录仅记录在暂存区，磁盘仍然保留文件
git mv README.md README # 更改文件名字
git commit -m 'initial project version' # 提交更新，-a跳过使用git add
```

## 1.4. 历史记录

```bash
git log # 按提交时间列出提交历史 -p显示每次提交的差异 --stat仅显示文件差异 
```

## 1.5. 撤销

```bash
git commit --amend # 第二次提交将代替第一次提交
git reset HEAD <file> # 取消文件暂存
git checkout -- <file> # 撤销文件修改
```

```bash
git reset HEAD^ --hard
git push -f [remote] [branch]
```

```bash
# Delete the most recent commit, keeping the work you've done:
git reset --soft HEAD~1

# Delete the most recent commit, destroying the work you've done:
git reset --hard HEAD~1

# 撤销(回退)某次commit
git revert commit_hash_id # (revert会产生一个新的commit,回退代码)

# 撤销git add操作
git rm --cache xxxx # 从暂存区删除,这个不会删除物理文件

```

## 临时仓库（stash)

```bash
git stash
git stash list
git stash apply
git stash pop
git stash drop
```

* stash 不小心被clear或者drop
    * git fsck --lost-found
    * 复制dangling commit 的id（其他的dangling blob不用理会）
    * git show [id]
    *  查看具体内容， 找到你想要的记录，记录中会描述日期和摘要，日期是你git stash 的日期， 摘要会记录你是在哪一条commit 上进行git stash操作的，
    * git merge [id]

## 1.6. 打标签

```bash
git tag # 以字母顺序列出所有标签
git tag -a v1.4 -m 'my version 1.4' # 创建附注标签 -m指定存储在标签中的信息
git show [tag-name] # 显示所有的标签信息
git push origin [tag-name] # 传送标签到远程仓库
git push origin --tags # 把所有不在远程仓库服务器上的标签全部上传
git checkout -b [branchname] [tagname] # 在特定的标签上创建一个新分支

```

## 1.7. 别名

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

# 2. Git 分支

## 2.1. 本地分支管理

```bash
git branch [branch_name] # 创建分支
git checkout [branch_name] # 切换分支
git checkout -b [branch_name] #创建并切换分支
git log --oneline --decorate # 查看各个分支当前所指的对象
git checkout [branch_name] # 切换分支
git log --oneline --decorate --graph --all  # 输出提交历史、各个分支指向及项目的分支分叉情况
git merge [branch_name] # 合并分支到当前分支
git branch -d [branch_name] # 删除分支 -D强制删除
git mergetool # 启动可视化合并工具
git branch # 查看分支列表 -V查看每一个分支的最后一次提交 --merged查看已合并到当前分支的分支 --no-merged查看未合并的分支
```

## 2.2. 分支工作流（work silos）

- [ ] master: 保留完全稳定的代码——仅仅是已经发布或即将发布的代码
- [ ] develop(next): 后续开发或者测试稳定性——这些分支不必保持绝对稳定，但是一旦达到稳定状态，就可以被合并入 master 分支 
- [ ] 特性分支（短期分支): 能够通过所有测试，并且不会引入更多 bug 之后，就可以合并入主干分支中，等待下一次的发布
- [ ] proposed（建议）: 建议更新分支，它因包含一些不成熟的内容而不能进入develop分支,没有太大必要。

## 2.3. 远程分支管理

```bash
git remote show (remote_name) # 远程跟踪分支
git fetch origin # 从origin抓取本地没有的数据，并更新本地数据库，移动 origin/master 指针指向更新后的位置
git push [remote_name] [branch_name]：[remote_branch_name] # 将本地[branch_name]分支推送到有写入权限的远程仓库
git checkout -b serverfix origin/serverfix # 会创建一个用于工作的本地分支serverfix，并且起点位于 origin/serverfix
git checkout --track origin/serverfix # 创建serverfix分支从origin/serverfix拉取数据
git branch -u origin/serverfix # 修改正在跟踪的上游分支 -u即--set-upstream-to
git branch -vv # 查看设置的所有跟踪分支
git fetch --all # 抓取所有的远程仓库
git push origin --delete serverfix # 删除远程分支serverfix
git push -f origin lbranch-3:refs/rbranch-1 # 用本地分支lbranch-3覆盖远程分支rbranch-1
```

设置远程地址的文件在.git目录下的config文件中

```bash
git remote rm origin # 删除远程地址
git remote add origin [url] # 添加远程地址
```

```bash
git remote origin set-url [url] # 修改远程地址
```

## 2.4. 变基

> rebase将提交到某一分支上的所有修改都移至到另一分支上，就像“重新播放”.和merge的整合方法的最终结果没有任何区别，但是变基使得提交历史更加整洁。

```bash
git checkout experiment // 检出到experiment分支
git rebase master // 将experiment分支上的修改变基到master上
git checkout master // 检出到master分支
git merge experiment // 将master指针快进合并
git rebase --onto master server client // 取出 client 分支，找出处于 client 分支和 server 分支的共同祖先之后的修改，然后把它们在 master 分支上重放一遍
```
> 只对尚未推送或分享给别人的本地修改执行变基操作清理历史，从不对已推送至别处的提交执行变基操作.

## 参考资料

[Git Book](https://git-scm.com/book/zh/v2)<br />
[Git Flight Rule](https://github.com/k88hudson/git-flight-rules)
<br />
[Git教程™](https://www.yiibai.com/git/)
[Code-Guide](https://github.com/loan-front-team/Code-Guide/blob/master/git-guide.md)
