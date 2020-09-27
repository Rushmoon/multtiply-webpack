import React, { useState,useReducer } from "react";
const AppContext = React.createContext({})
export default function Start(props) {
    let MainModel = props.model
    let name = MainModel.name;
    const initState = MainModel.data
    function mainReducer(state = MainModel.data,action){
        let actionType = action.type;
        let moduleName = actionType.split('/')[0]
        let funcName = actionType.split('/')[1]
        let syncMethod = null;
        if(moduleName === name){
            syncMethod = MainModel.sync[funcName];
        }
        if(syncMethod){
            return syncMethod(state,action.payload);
        }else{
            return state
        }
    }
    const [ab, dispatch] = useReducer(mainReducer,initState);
    return (
        <AppContext.Provider value={{
            ab,
            dispatch // 把 dispatch 也作为 context 的一部分共享下去，从而在嵌套组件中调用以实现更新顶层的 state
        }}>
            {
                React.Children.map(props.children,child => {
                    return React.cloneElement(child,{
                        Context: AppContext
                    })
                })
            }
            {/*<props.Content Context = {AppContext} />*/}
        </AppContext.Provider>
    );
  }
