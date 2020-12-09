/*浅拷贝 Object.assign*/
function objectAssign(target,...source) {
    if(target === undefined || target === null){
        return null
    }
    const targetObj = Object(target);
    for (let i = 0;i<source.length;i++){
        let ObjSource = source[i];
        if(ObjSource === undefined || ObjSource === null){
            return null
        }
        let sourceKey = Reflect.ownKeys(Object(ObjSource));
        for(let index = 0;index<sourceKey.length;index++){
            let nextKey = sourceKey[index];
            let des = Object.getOwnPropertyDescriptor(ObjSource,nextKey);
            if(des && des.enumerable){
                targetObj[nextKey] = ObjSource[nextKey]
            }
        }
    }
}
let obj = {};
Object.defineProperties(obj, {
    'property1': {
        value: true,
        writable: true
    },
    'property2': {
        value: 'Hello2',
        writable: false
    },
    'property3': {
        value: 'Hello3',
        enumerable:false,
        writable: true
    },
    'property4': {
        value: 'Hello4',
        enumerable:true,
        writable: false
    },
    'property5': {
        value: 'Hello5',
        writable: false
    }
    // etc. etc.
});

console.log(obj);

/*深拷贝*/
function DeepCopy(source) {
    if(source === null){return source}
    if(source instanceof Date){ return new Date(source)}
    if(source instanceof RegExp) return new RegExp(source);
    if(typeof source === 'function'){
        return new function(source){
        };
    }
    if(typeof source !== 'object'){
        return source
    }
    let target = new source.__proto__.constructor;
    for (let i in source){
        //如果不要继承过来的属性的话，就用hasOwnProperty()去过滤下
        target[i] = DeepCopy(source[i])
    }
}

