# 数据管理

## 导出方法

| 方法名 | 说明 |
|-------|-----|
| register | 注册model，接受一个类，或者一个类数组作为参数，返回类存储的顺序数组 |
| startModel | 启动model的实例化，接受一个函数作为实例化之后的回调函数，返回一个对象，对象包含一些列方法 |
| extendRegular | 扩展检测方法，接受一个对象作为参数，对象的索引是方法名，值是方法，这个方法返回的格式必须是 {verification: true}这种类型 |
| addModel | 添加额外的model，在执行了startModel之后，仍然可以通过addModel方法添加model类，适用于公用组件自动添加model类 |

## startModel方法返回的对象（以下假设这个值为store）拥有的方法

### store拥有的方法

| 方法名 | 说明 | 示例 |
|-------|-----|------|
| getData(keyListStr[, regulars]) | 获取任意model里的数据，接受两个参数，第二个参数为选填。第一个参数为所要获取数据的键值字符串，第二个参数为过滤方法，可以是数组，函数，正则，字符串。调用这个方法会发布CALL_GET_DATA事件。 | store.getData('abc.info.name', ['required', 'email']), 这个方法获取名字为abc的model里的info对象下的name属性的值，并且同时检测是否为空，是否符合email格式 |
| setData(keyListStr, value) | 设置任意model里的数据，接受两个参数，第一个参数是键值串，第二个为要更新的值。调用这个方法会发布CALL_SET_DATA 事件 | store.setData('abc.info.name', 'alilang')，这个示例设置名为abc的model的info里的name属性值为alilang。|
| verifyValue(value, regular) | 验证数据，第一个参数为要验证的数据，第二个参数为验证规则，可以为字符串正则和函数 | store.verifyValue({}, 'required'), 验证对象是否为空 |
| models | store.models上挂载了以model的name名称为key值的对象，对象指向model实例 | store.models.abc 获取名为abc的model实例 |

### store.pubSub 
| 方法名 | 说明 | 示例 |
|------|------|-----|
| store.pubSub.publish | 发布事件 | store.pubSub.publish('abcDelete', 'yes', new Date().getTime()), 发布了一个abcDelete事件，并且传了两个参数 |
| store.pubSub.subscribe | 订阅事件 | store.pubSub.subscribe('abcDelete', (a, b) => {}), 订阅了一个abcDelete事件 |
| store.pubSub.unSubscribe | 取消订阅 | store.pubSub.unSubscribe('abcDelete', fn), 取消abcDelete事件的fn函数的订阅 |

## model类的属性 

| 名称 | 说明 |
|-----|------|
| name | 此model的命名空间，字符串 |
| data | 数据格式，对象 |
| methods | model自己的方法，这里面的方法都会自动带有，getData, setData函数作为参数，并且只能对本model设置 |
| didInstance | 实例化之后的生命周期函数 |