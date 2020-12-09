/*
1.什么是原型

2.什么是原型链
* */




function New(fn ,...arg) {
/*
1.创建一个空对象
2.将对象实例的__proto__指向构造函数的原型（prototype）
3.将 this 绑定到新的对象当中
4.执行构造函数，（如果有返回值则直接替代我们的新对象）
* */
    const result  = {};
    Object.setPrototypeOf(result,fn.prototype);
    let resultReplace = fn.apply(result,arg);
    if(typeof resultReplace === 'object' || typeof resultReplace === 'function' && resultReplace){
        return resultReplace
    }
    return result
}


//a instanceof b 判断实例的类型是否是右边的构造函数的实例
function InstanceOf(left , right) {
    let leftVal = Object.getPrototypeOf(left);
    const rightVal = right.prototype;
    while (leftVal != null){
        if(leftVal === rightVal){
            return true
        }
        leftVal = Object.getPrototypeOf(leftVal);

    }
    return false
}

var obj = {};


/*
在对象上添加可枚举的属性。其中的value是属性的值
configurable
true 当且仅当该属性描述符的类型可以被改变并且该属性可以从对应对象中删除。
默认为 false
enumerable
true 当且仅当在枚举相应对象上的属性时该属性显现。
即for in json.stringfy object.keys 这些遍历无法取到该属性。
默认为 false
value
与属性关联的值。可以是任何有效的JavaScript值（数字，对象，函数等）。
默认为 undefined.
writable
true当且仅当与该属性相关联的值可以用赋值运算改变时。
默认为 false
*/
Object.defineProperties(obj, {
    'property1': {
        value: true,
        writable: true
    },
    'property2': {
        value: 'Hello',
        writable: false
    }
    // etc. etc.
});


Function.prototype.apply2 = function(content,...args){
  let obj = content ? Object(content):window;
  obj.fnnn = this;
  let result = obj.fnnn(...args);
  delete obj.fnnn;
  return result
};

function A(){
    this.aa = 'aa'
}
A.prototype.af = function(){
    console.log(this.aa)
};
let a = new A();
a.af();
console.log(a.__proto__);
console.log(A.prototype.__proto__);
console.log(obj.__proto__);

Function.prototype._bind = function(content,...args){

};
