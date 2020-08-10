####首先回答之前的几个问题：
1. 关于dispatch和getState是哪里来的问题：\
（1）.createStore()函数返回了一些内容 
    ```
    export default function createStore(reducer, initialState) {
        ...
        return {
            dispatch, // 用于action的分发，改变store里面的state
            subscribe, // 标记下：注册listener，store里面state发生改变后，执行改listen
            getState, // 读取store里面的state（只读）
            replaceReducer // 替换reducer，改变state修改的逻辑
        }
    }
    ```
2. 关于是否需要每个组件使用的时候都需要注册connect：\
    否定的，只需要最高的父组件去注册就可以了，但我们为了使得结构清晰，所以才将注册分开的.参考自定义的redux    
3. 关于每个reduce返回值的问题：\
    并不是返回全部的state，而是返回需要被更改的state就可以了，多返回只会将state更改掉
   
####redux的几个重要的函数：
- createStore()
- combineReducers() 合并reduces
- connect() 将获取state和action的使用方法都暴露给compoents