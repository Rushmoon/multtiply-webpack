
/**
 * 功能：读取action里的extend字段，extend字段是一个数组或对象或者一个或者一个类，数组内容是类，
 * 当前的action会继承extend内的类，如果当前action内写了同名方法，会覆盖超类的方法。
 * 
 * 注意超类内的方法的实现，如果使用箭头函数，则方法内的this指向会固定到超类实例
 *  */


export default function frameExtend(childAction, context) {

    let extend = childAction.extend;

    if(!extend) {
        return;
    }
    if(Array.isArray(extend)) {
        extend.map((Action) => {
            extendObject(childAction, Action);
        });
    }
    else if(typeof extend === 'function') {
        extendObject(childAction, extend);
    }
    else if({}.toString.call(extend) === '[object Object]') {
        mergeProperty(childAction, extend);
    }
    else {
        return;
    }

    function extendObject(child, ParentAction) {
        let parentAction = new ParentAction(child, context);
        
        mergeProperty(child, parentAction);
    }

    function mergeProperty(child, parent) {
        if(parent.extend) {
            frameExtend(parent, context);
        }

        let props = Reflect.ownKeys(parent);

        for(let key of props) {
            if(!child.hasOwnProperty(key) && key !== 'constructor') {
                if(typeof parent[key] === 'function') {
                    child[key] = parent[key].bind(child);
                }
                else {
                    child[key] = parent[key];
                }
            }
        }
    }
}