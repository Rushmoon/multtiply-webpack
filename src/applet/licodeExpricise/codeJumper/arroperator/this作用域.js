/*
console.log(typeof typeof typeof null);
*/

/**
var a = 12;

function fn () {
    console.log(a);
    var a = 45;
    console.log(a)
}
fn();
 */

/*
var a = 2;
var  obj = {
    a:1,
    fn:function (){
        // var a = 2;
        console.log(this.a);
        console.log(a)
    }
};
obj.fn();
*/
/*
var a = 1;
function b(fn) {
    fn()
    var a = 2;
}
function fn() {
    console.log(a)
}
b(fn);
*/
/*
function fn () {
    console.log(12)
}
var as = fn();
console.log(as);
*/

/*
var a = 12;
function fn () {
console.log(a);
return 4;
var a = 45;
}
fn()
* */
/*
var a = 123;
function fun () {
    console.log(a);
     a = 456;
}
fun();
console.log(a);
*/
/*
function makeNoSense (x) {
    this.x = x;
}
makeNoSense(5);
console.log(x);
function test () {
    this.x = 1;
    console.log(this.x);
}
test();
*/
/*
var name = '222';
var a = {
    name : '111',
    say : function () {
        console.log(this.name)
    }
};

var fun = a.say;
fun(); //???
a.say();//???

var b = {
    name : '333',
    say : function (fun) {
        fun();
    }
};
b.say(a.say); //???
b.say = a.say;
b.say(); //???
*/
/*
var val = 1;
var obj = {
    val : 2,
    dbl : function() {
        var val = 45;
        console.log(this); //指向谁？
        this.val *= 2;
        console.log(this.val); //？？
        console.log(val); //？？
    }
};
var fn = obj.dbl;
fn();
*/
/*
var x = 12;
function test() {
    console.log(this.x)
}
var obj = {
    x:45,
    ss:function(){
        console.log(this)
        test()
    }
}
obj.ss() //??
*/
/**/
var val = 1
var obj = {
    val : 2,
    dbl : function() {
// var val = 45;
        console.log(this); // 指向谁
        this.val *= 2;
        console.log(this.val); // ???
        console.log(val); // ???
    }
}
var ff = obj.dbl();
