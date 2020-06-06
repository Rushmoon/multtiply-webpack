import BaseMethods from './base-methods';

import store from './store';
import pubSub from './pubSub';

import {getType} from './h';
import insetRegular from './inset-regular';
import {INSET_WORD} from './constant';

import instanceModel from './instanceModel';

let insetMethods = BaseMethods();

// 全store实例
let storeObj = {
    ...insetMethods,
    pubSub: pubSub,
    models: {}
};

// 扩展内置验证数据方法
export const extendRegular = insetRegular.extendRegular;

// 注册model，在注册的时候给model的prototype属性添加各种model内可用的方法
// 参数支持一个model也支持model数组
// 返回值是一个model的索引数组
export const register = (Model) => {
    let indexList = [];
    let ModelList = [];
 
    if(typeof Model === 'function') {
        ModelList = [Model];
    }
    else if(Array.isArray(Model)) {
        ModelList = Model;
    }

    ModelList.forEach((ModelItem) => {
        // 通过store提供的方法，存储下Model本身，留下影子应对后来的类型判断
        let modelIndex = store.setModelClass(ModelItem)
        indexList.push(modelIndex);
    });
    return indexList;
}

export const addModel = (Model) => {
    let modelIndexList = register(Model);

    let modelsClass = [];

    modelIndexList.forEach((key) => {
        modelsClass.push(store.getModelClass(key));
    });

    let insResult = instanceModel(modelsClass, storeObj);

    insResult.modelAllInstanceCallback.forEach((fn) => {
        fn(storeObj);
    });

    Object.assign(storeObj.models, insResult.models);
}

export const startModel = (callbackFun) => {

    // 拿到注册的class
    const ModelClassList = store.getModelClass();

    let insResult = instanceModel(ModelClassList, storeObj);
    let models = insResult.models;
    // 所有已注册model实例化完成钩子，对应model里的didAllInstance
    let modelAllInstanceCallback = insResult.modelAllInstanceCallback;

    Object.assign(storeObj.models, models);

    modelAllInstanceCallback.forEach((fn) => {
        fn(storeObj);
    });

    typeof callbackFun === 'function' && callbackFun(storeObj);

    return storeObj;
}