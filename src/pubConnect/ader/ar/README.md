## render方法解析

```js
import {render, start, connect} from './index.js';

const YourComponent = render({
    actions: {
        customAction: CustomActionClass
    },
    state: {
        name: 'abc'
    },
    scope: ['name'],
    yourData: '我是自定义的任何的数据'
})(({props, action, state}, {yourData}) => {

    return (
        <div
            onClick={action.customAction.btnClick}
        >
            {props.name}
        </div>
    );

})


class CustomActionClass {

    extend = [ParentClass]
    
    didMount = () => {
        console.log('会在组件渲染完的didmount里渲染');
    }

    didUpdate = () => {
        console.log('会在每次组件更新完毕之后执行，对应组件的componentdidupdate')
    }

    btnClick = () => {
        console.log('按钮点击了');
    }

    didInstance = () => {
        console.log('会在当前action在组件上实例化完成之后执行');
    }

    didAllInstance = () => {
        console.log('会在组件上的所有action实例化完成之后执行');
    }

    willUnMount = () => {
        console.log('会在每次组件卸载之前执行，对应组件的componentWillUnMount');
    }

}

const model = {
    name: 'demo',
    data: {},
    sync: {},
    async: {}
};

const CompWithRedux = connect(YourComponent);

start({
    root: document.getElementById('app'),
    model: model,
    component: <CompWithRedux />
});

```

### 分层

> MVC分层理念，model代表M，进行数据管理，render内的jsx代表V，页面结构管理，action代表C，进行行为管理

### 实现

> MVC的连接及分层由render方法实现，render方法是一个高阶函数，接受一个对象作为参数，返回一个函数。

```js
let fn = render({
    actions: {
        action1: Action1
    },
    state: {
        name: 'sssss'
    },
    customData: '哈哈哈'
});
```

#### 参数解释

| 字段 | 类型 | 解释 |
|-----|------|-----|
| actions | 对象 | 配置action和组件连接，最终action的方法都会挂到组件上的action对象上，命名由actions的key值决定。|
| state | 对象 | 自定义本组件的state状态 |
| ...others | any | 用户自定义字段 |

#### 返回函数接受一个函数作为参数，做参数的函数有两个对象参数，第一个对象有props，state，action，第二个对象里是自定义的值

```js
let WrapperComponent = fn(({props, state, action}, {customData}) => {
    return (
        <div>   
        </div>
    );
});
```

### action

> 每一个action都默认添加了一个pubSub对象，该对象有三个方法，一个项目里所使用的发布订阅是同一个对象，所以用这个方式，可以进行跨越层级的事件通讯，方法如下

| 方法名 | 参数 | 说明 |
|-------|-----|------|
| publish | type[, args...] | 发布消息，type是消息类型，args是参数，除了type，剩余的所有参数都会传入订阅方法回调函数的参数 |
| subscribe | type, callback | 订阅消息，type是消息类型，callback是回调函数，callback参数是publish的传入 |
| unSubscribe | type[, fn] | 取消订阅，如果传入fn，取消对应的函数，如果没有传入，则取消这个type下的所有订阅函数 |

> action里有几个固定的函数，对应了action和组件的一些生命周期

| 函数名 | 说明 |
|-------|-----|
| didMount | 对应绑定组件的componentDidMount |
| willUnMount | 对应绑定组件的componentWillUnMount |
| didUpdate | 对应绑定组件的componentDidUpdate |
| didAllInstance | 当组件绑定的所有action都完成了实例化之后执行 |
| didInstance | 当前的action完成实例化之后执行 |

```js
// 用法示例
class CustomAction {
    constructor(comp) {
        this.comp = comp;
    }
    // 订阅状态更新
    subStateUpdate = () => {
        this.pubSub.subscribe('updateState', (obj) => {
            this.setState({
                ...obj
            });
        });
    }
    // 发布状态更新
    pubStateUpdate = () => {
        this.pubSub.publish('updateState', {
            name: '我是更新的状态值'
        });
    }
}

```

> action里还有固定的属性

| 属性名 | 类型 | 说明 |
|-------|-----|------|
| extend | Array\[class, class\]/Object/class | 可以继承该属性内设置的类/对象，注意超类里的方法如果用了箭头函数定义，则该方法中的this会一直指向超类的实例。 |

```js
class ParentAction {
    abc = 'lingyun'
    show = function() {
        console.log(this.abc)
    }
}

class Action {

    extend = [ParentAction]

    didMount = () => {
        this.show(); // 输出：lingyun
    }
}
```