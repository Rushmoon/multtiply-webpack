function deepClone(thing) {
    if(thing === null) return null;
    if(thing instanceof RegExp) return new RegExp(thing);
    if(thing instanceof Date) return new Date(thing);
    if(typeof thing === 'Function'){
        return new function (thing) {};
    }
    if(typeof thing !="object"){
        return thing
    }
    console.log(thing.__proto__.constructor)
    let newObj = new thing.__proto__.constructor;
    // let newObj = {}
    for (let key in thing) {
        newObj[key] = deepClone(thing[key])
    }
    return newObj
}
/*
    typeof存在7或6种类型分别为 "number," "string," "boolean," "object," "function" ,"undefined."以及'symbol' 。
    null,array,object返回的都是‘object’
    但使用instanceof 可以分出 obj 和 array
    array.constructor === Array //true 还需验证
*/
let obj={
    name:'xm',
    birth:new Date,
    desc:null,
    reg:/^123$/,
    ss:[1,2,3],
    fn:function(){
        console.log('123')
    }
};
let newObj = deepClone(obj);
console.log("renshengyingjia",obj);
console.log("mofangderensheng",newObj);
