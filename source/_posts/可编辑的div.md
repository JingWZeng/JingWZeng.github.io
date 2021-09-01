---
title: 可编辑的div
date: 2021-08-27 19:37:48
description: 可编辑的div，包括字数统计与限制,放置可拖动图片,利用el-form做验证和图片与字符混合提交给后端
cover: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109011607384.jpg
top_img: https://cdn.jsdelivr.net/gh/JingWZeng/markdownImg/img/202109011607384.jpg
tags: 
 - 前端
 - 可编辑的div
author: ZJingW
categories: 
 - 前端
 - 可编辑的div
---
如果利用`textarea`的输入框，只能输入文本，无法输入图片等。比较好的方法是利用可编辑的`div`进行实现。

### div的可编辑
`div`要完成可编辑，只需要设置`contenteditable = "true"`即可实现。我们可以监听用户输入的区域,用户输入的时候，获取其中的`innerText`，之后进行字数的限制判断，重新设置其`innerHtML`，超出的字数显示成其他颜色。在提交之前，对表单进行预验证，要求用户删除多余的字符，方可提交给后端。

:dango:可编辑的`div`的难点在于光标难于控制，因此设置`html`的时候利用两层`div`重叠的方式进行解决
+ 上层的`div`用于文本的输入,背景颜色透明
+ 下层的`div`节点用于高亮超出的部分文字，文字颜色设置为透明，超出的部分设置背景颜色进行高亮

:hotdog: **bug1:`div`的高度自适应**
```javascript
<div class="box" contenteditable="true" ref="box"></div>
<div class="hightLight"></div>
.box{
    width:400px;
    min-height:200px; //实现自适应
    max-height:400px;
    margin-left:auto;
    margin-right:auto;
    padding:3px;
    outline:none; // div在获取焦点的时候有虚框,让它消失
    border:1px solid #dedede;
    word-wrap:break-word;
    overflow-x:hidden;
    overflow-y:auto;
}
```

:taco:**bug2:输入框的`placeholder`**
```css
.box:empty::before{
    content:attr(placehoder);
    color:#dedede;
    position:absolute;
}
```
之后就可以在`html`中使用`placeholder`属性。但是存在一些问题(点击回车的时候,会插入`<div></div>`或者`<br>`，这会导致一些问题，甚至影响到统计的字数)
解决办法:
:one: 通过`JS`手动的添加、移除`class`类处理`placeholder`的显示与隐藏
```javascript
.box.is-show-ploacehoder::before{
    content:attr(placehoder);
    color:#dedede;
    position:absolute;
}
// JS
let box = this.refs.box 
box.addEventListener('input', () => {
  if (box.innerHTML === '<div><br></div>' ||
    box.innerHTML === '<br>' ||
    box.innerHTML === '') {
    box.classList.add('is-showPlaceholder')
  } else {
    box.classList.remove('is-showPlaceholder')
  }
})
```
:two: 第一层`div`使用`textarea`替换，`textarea`中有`placeholder`属性

:tomato:**bug3:输入中文的统计字数**
在中文输入的时候,中文还没有输入到输入框中的时候，字数已经在开始统计了，合理的是中文输入`composing`组合的过程中不应该计算字数，在`composed`组合完成输入到输入框中的时候再计算。
`composing`:在中文输入中，组合开始
`compsied`:在中文输入中，组合完成
```javascript
let isComposing = false
editorArea.addEventListener('compositionstart', () => {
  isComposing = true
})
editorArea.addEventListener('compositionend', () => {
  isComposing = false
  // 字数统计
  let text = box.innerText
  // 判断字数是否超出限制
  setCounter(limitCnt - text.length)
})
```
:banana:**bug4:文件选择器于前端预览图片**
古老的时候是无法直接在前端预览图片的，那时候借助的是ajax预先把图片发送给服务端，服务端返回图片的地址，前端利用img标签进行显示。不论用户需不需要上传该图片，该图片等会被上传到服务器中。
现在的做法:
+ `fileReader`--->我不用
+  `URL.creatObjectURL` :point_left:
`URL.creatObjectURL()`方法会创建一份DOMString对象，它包含url，这个url的生命周期跟创建它的窗口绑定，并且这个url就是操作的对象的映射地址（临时地址）
```javascript
<input type="file" accept="image/*" ref = 'imgFiles' @change="handleChange">
<img :src="srcImg">
handleChange(event){
    const fileObj = event.files[0] //对于type="file" input.files[0]得到当前选中的file对象
    const img = new Image()
    this.srcImg = file ? URL.createObjectURL(fileObj) : ''
}
```
:apple:**bug5:拖动于前端预览图片**
拖动是利用`html5`中的`drop`、`drogover`、`drogleave`方法
drogover:移进到了敏感区域，一直调用
注意::loud_sound:需要阻止它们的默认方法,负责网页会自动打开该图片
+ `DataTransfer`对象出现在拖拽事件中，具体包括开始拖拽`dragstart`事件，拖拽进入`dragenter`事件，拖拽离开`dragleave`事件，拖拽经过`dragover`事件，拖拽释放`drop`事件以及拖拽结束`dragend`事件。
+ `DataTransfer.items `（只读）
提供`DataTransferItemList`对象，该对象是所有拖动数据的列表。
```javascript
@drogover = "handleDrogover"
@drop= "handleDrop"
handleDrogover(e){
    e.preventDefault()
    e.stopPropagation()

}
handleDrop(e){
    e.preventDefault()
    e.stopPropagation()
    const dt = e.dataTransfer
    const oFile = dt.item[0] // 文件对象
    if(/image/.test(oFile.type)){// 判断是否为图片对象
    const blod = new Blod([oFile ])// 生成Blod对象
    const img = new Image()
    const imgSrc = URL.createObjectURL(blod)//URL.createObjectURL()可以处理File对象、Blod对象
    img.src = imgSrc
    img.onload = function(){
        box.appendChild(img)
    }
    }
}

```
:grapes:**bug6:`formData`传输多个文件**
```javascript
let formData = new FormData()
for(let i = 0;i<fileObj.length;i++){
    formData.append('file[]',fileObj[i])
}

// 不可以直接console.log(formData)---->需要利用formData.get([key])
```