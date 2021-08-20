---
title: VsCode中使用git
date: 2021-08-20 17:24:49
tags: 
 - VsCode
 - Git
author: zJingW
categories: 
 - VsCode
 - Git
---

**在VsCode中使用Git提交的过程**
1. 先确定提交的分支,"+"是提交到暂缓区,相当于`git add .`
2. "√"是将暂缓区的代码提交到本地代码仓库,相当于`git commit -m ""`
3. 提交到`github`远程仓库之前，应该先"拉取"远程仓库，用来和本地的仓库做同步，如果有冲突，VsCode会自动跳出冲突，编辑解决完冲突之后，再进行下一步
4. 最后一步"推送"，本地仓库的代码同步到`github`远程仓库
