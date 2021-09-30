---
title: JS小偏门
date: 2021-09-30 11:21:26
author: ZJingW
categories: JS
description: JS的偏门知识
top_img: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109301132580.jpg
cover: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109301132580.jpg
tags: 
 - 前端
 - JS
---
- 复制数组`array.concat()`

- `console.table(obj)`用于对象或者对象数组。`console.clear()`清空控制台

- `eval()`参数是字符串，将字符串变成可执行的`JS`代码

- `a`标签的`href`的动态参数，可以设置为参数设置不同的值

  ```javascript
  <a :href="'www.ZJingW.blog?id='+userId" ></a>
  let userId =1111
  ```

- this既不指向函数自身也不指向函数的词法作用域。this实际上是在函数调用的时发生的绑定，**它指向啥完全取决函数在哪里被调用**

- 调用栈->为了到达当前执行位置所调用的所有的函数 | 调用位置-->当前正在执行的函数的前一个调用中

- `html5` 的`meta`

```html
meta 有4个属性 name http-equiv charset content
content和它们搭配使用，content = '具体的描述'
name 主要用于描述网页 content就是进一步说明name，也就是指定具体的name对象
http-equiv 相当于http的文件头作用，比如说定义htt平参数啥的 
1.<meta charset="UTF-8"> // html5固定的写法,简写
2.X-UA-Compatible(浏览器采取何种版本渲染当前页面)
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> //指定IE和Chrome使用最新版本渲染当前页面
3.cache-control(指定请求和响应遵循的缓存机制)
<meta http-equiv="cache-control" content="no-cache">
no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）
public : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果
private : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）
maxage : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。
<meta http-equiv="cache-control" content="no-siteapp">的作用是避免在移动端浏览时，被百度自动转码
4.expires(网页到期时间)，就是网页资源过了设置这个时间之后，就重新请求资源是否改变，改变则更新
5.refresh(自动刷新并指向某页面)
 <meta http-equiv="refresh" content="2; url='https://myblog-six.vercel.app/'"> //意思是2秒后跳转向我的博客
6.Set-Cookie(cookie设定)如果网页过期，那么这个网页存在本地的cookie也会自动被删除
<meta http-equiv="Set-Cookie" content="name,data"> //格式
```

- `vh`就是当前屏幕可见高度的1%，也就是说 `height:100vh === height:100%`

```css
// 问题来了:固定页脚做法 
<body>
<main</main>
<footer></footer>
</body>
1.已知footer的高度，去设置<main>的最小高度
min-height:calc(100vh - footer的高度)  // 注意 -的前后需要有空格，不然不生效
2.未知footer的高度 
利用flexBox。body设置flex，同时min-height:100vh，并把伸缩方向设置成column，mian设置成flex：1
flex 只要设置了大于0的值，就获得可伸缩的特性
如果main设置了flex:2 ,footer设置了flex:1 。那么main的高度是footer的两倍
    body{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    main{
        flex: 1;
        background-color: brown;
        width: 100%;

    }
    footer{
        width: 100%;
        background-color: aqua;
        height: 100px;
    }
```

- `:first-child`表示在一组兄弟元素中的第一个元素。注意是相同的元素
- `text-shadow`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    div {
        height: 200px;
        width: 300px;
        font-size: 100px;
        text-align: center;
    }
    .a {
        background-color: deeppink;
        color: #fff;
        text-shadow: 1px 1px black, 1px -1px black, -1px 1px black, -1px, -1px, black;
        /* 没有背景颜色，相当于镶边效果  x y blur color x为负数，阴影在左，y为负数，阴影在右*/
    }
    .glow {
        background-color: #203;
        color: #ffc;
        text-shadow: 0 0 .1em, 0 0 .3em;
        /* 没指定颜色，阴影就和文字一个颜色 */
    }
</style>
<body>
    <div class="a">css</div>
    <div class="glow">glow</div>
</body>
</html>
```

![text-shodow](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109171149919.png)

+ `Set`方式去除字符串里面的重复字符

```javascript
Set.prototype.add(value)：添加某个值，返回 Set 结构本身。🤔
Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
Set.prototype.clear()：清除所有成员，没有返回值。
```



![image-20210920151716408](https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109201517506.png)

+ `Object.defineProperty`

为对象新增属性或者修改属性的时候呢，有两种不同的方法：

1. 直接使用 = 赋值
2. 使用`Object.defineProperty()`定义

区别就是使用 = 的话，对象的该属性的`writable`、`enumerable`和`configurable`都为`true`。

使用`defineProperty`的话，它们都是`false`,也就是该属性不可以被修改、被遍历、被删除。

`configurable`:当且仅当该属性的`configurable`为`true`时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除

+ `URL`编码

当期望获取一个可用的URL地址时，使用`encodeURI()`
当需要对`URL`的参数进行编码时，使用`encodeURIComponent()`，如果它作用于整个`url`，它会编码`http://`导致完成后的不是一个可用的`url`地址
[关于`url`编码](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html) 

+  子组件想修改父组件的值并传给父组件

`vue`本身是单向数据流的，就是子组件不能直接修改父组件的值，如果子组件想更新父组件的值的话，可以利用`.sync`和`$emit(update:xxx)`。其实是简化了在子组件定义一个事件，父组件处理该事件。

子组件`son`

`this.$emit('update:myMsg',val);`

父组件

`<son :my-msg.sync = "val"/> //此处my-msg一定需要使用kebeb-base写法，驼峰是无效的`

