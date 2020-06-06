// 存储所有数据, 不可替换

import {
    getType,
    deepCopy
} from './h';

// 数据源
const sourceData = {};
// 存储model实例
const model = {};
// 存储model对应的类
const ModelClassList = [];
// 存储同步方法
const syncMethods = {};
// 存储异步方法
const asyncMethods = {};

// 缓存，闲时插入sourceData
const cache = {};
// 定时器
const timer = {};
// 当前数据时间戳
const storeDate = {};

function storeCache(key) {

    clearTimeout(timer[key]);
    timer[key] = setTimeout(() => {
        if(key in cache) {
            sourceData[key] = deepCopy(cache[key]);
            delete cache[key];
        }
    }, 1000);

}

export default  {
    // 合并数据
    setData(modelName, obj) {
        cache[modelName] = obj;
        storeDate[modelName] = new Date().getTime();
        storeCache(modelName);
    },

    // 返回数据，返回的数据经过拷贝，并非头部对象，以此彻底隔绝别人通过返回数据修改data对象
    getData(modelName) {
        if(!(modelName in model)) {
            let data = Object.assign(sourceData, cache);
            return deepCopy(data);
        }

        if(modelName in cache) {
            return cache[modelName];
        }
        return deepCopy(sourceData[modelName]);
    },

    // 获取某块数据存储时间戳
    getStoreDate(modelName) {
        if(!modelName) {
            throw new Error('no model name');
        }

        return storeDate[modelName]
    },
    
    // 存储model
    setModel(m) {
        if('name' in m) {
            model[m.name] = m;
            this.setData(m.name, m.data);
        }
    },

    // 获取model
    getModel(name) {
        if(model[name]) {
            return model[name]
        }
        return model;
    },
    
    // 存储model类
    setModelClass(modelClass) {
        ModelClassList.push(modelClass);
        return ModelClassList.length - 1;
    },

    // 获取model类列表
    getModelClass(index) {
        if(index !== undefined) {
            return ModelClassList[index];
        }
        return ModelClassList;
    }
}