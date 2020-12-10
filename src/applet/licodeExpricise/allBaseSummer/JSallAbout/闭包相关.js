/*
1.什么是闭包
闭包是指一个函数通过return、立即执行函数的方式，将另一个函数内部的变量和方法，暴露到外部。


闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内
创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域，将函数
内部的变量和方法传递到外部。


2.原理
借助函数的立即执行、参数以及函数的return返回值，多创建了一层作用域。从而实现外部函数
持续性被引用而不能释放内存空间，将值存储下来。

3.闭包的作用
闭包就是将函数内部和函数外部连接起来的一座桥梁。使得外部函数可以读取内部函数的变量，
这些变量的值始终保持在内存中，不会被垃圾回收器回收。
* */

// function foo() {
//     var a = 1;
//
//     function fn() {
//         a++;
//         console.log(a)
//
//     }
//     return fn()
// }
//
// console.log(foo);
// foo();
// foo();
function fn(){

    let sum = 0;
    function count(add){
        if(!add){
            //输出 console.log(sum);
        }else {
            sum += add;
            return count
        }
    }
    return count
    // return count()
}
let x = fn();

x(1)(2)();



function fun(n,o) {
    console.log(o);
    return {
        fun:function(m){
            return fun(m,n);
        }
    };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3); console.log('下一行');
var b = fun(0).fun(1).fun(2).fun(3); console.log('下一行');//
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);
//问:三行a,b,c的输出分别是什么？

var o={
    fn:function (){
        console.log(fn);
    }
};
o.fn();//ERROR报错
var fn1=function (){
    console.log(fn1);
};
fn1();//function (){console.log(fn1);};正确
/*
使用var或是非对象内部的函数表达式内，可以访问到存放当前函数的变量；在对象内部的不能访问到。

原因也非常简单，因为函数作用域链的问题，采用var的是在外部创建了一个fn变量，函数内部当然可以在内部寻找不到fn后向上册作用域查找fn，
而在创建对象内部时，因为没有在函数作用域内创建fn，所以无法访问。
* */

function test(){
    var n = 4399;
    function add(){
        n++;
        console.log(n)
    }
    return {
        n:n,
        add:add
    }
}
var res = test();
res.add();
console.log(res.n);


for(var i =0;i<10;++i){
    (
      function (i) {
          setTimeout(function () {
              console.log(i)
          },0);
      }
    )(i)
}
/*
* JS的垃圾回收机制会回收当前环境无法访问到的变量，而闭包将函数内部的变量暴露在外部，是的变量可达，所以没回收。
* JS回收机制的内部算法：标记-清除
* 1.垃圾回收器获取根并标记他们
* 2，然后它访问并标记所有来自他们的引用
* 3.然后它访问标记的对象并标记他们的引用。所有被访问的对象都被记住，以便以后哦不再访问同一个对象两次。
* 4.一次类推，直到有未被访问的引用为止
* 5.除标记的对象外，所有对象被删除
* */


/*
* 优化：
* 1.分代回收：分为老对象和新对象，老对象很少被检查，新对象用完及时回收
* 2.增量回收：将整个对象集分为多个部分，分别执行（减少耗时）
* 3.空闲时回收：在渲染帧空闲时，可以调用回收
* */
