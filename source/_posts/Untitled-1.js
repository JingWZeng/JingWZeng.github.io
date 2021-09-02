function baz(){
    //当前调用栈是 baz
    //调用位置是全局作用域
    console.log("baz")
    // bar调用位置baz
    bar()
  }
  function bar(){
    // 调用栈 baz - bar
    // 调用位置是在brz
    console.log("bar")
    foo()
  }
  function foo(){
    console.log('foo')
  }
  baz()