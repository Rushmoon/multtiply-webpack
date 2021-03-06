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
function fn1() {
    var a = 1;
    var b = 2;

    function fn() {
        a++;
        console.log(a)
    }
    return fn;

}
// 什么是闭包
// 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内
// 创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域，将函数
// 内部的变量和方法传递到外部。

// 原理
// 借助函数的立即执行、参数以及函数的return返回值，多创建了一层作用域。从而实现外部函数
// 持续性被引用而不能释放内存空间，将值存储下来。

// 闭包的作用
// 闭包就是将函数内部和函数外部连接起来的一座桥梁。使得外部函数可以读取内部函数的变量，
// 这些变量的值始终保持在内存中，不会被垃圾回收器回收。

var x = fn1();
x();
x();
var x2 = fn1();
x2();
