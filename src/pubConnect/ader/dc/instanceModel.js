import store from './store';

// 实例化model
const instanceModel = (ModelList, storeObj) => {
    let models = {};
    // 所有已注册model实例化完成钩子，对应model里的didAllInstance
    let modelAllInstanceCallback = [];

    ModelList.forEach((ModelClass, index) => {
        let model = new ModelClass();

        models[model.name] = model;

        if(model.methods) {
            Object.keys(model.methods).forEach((fnName) => {
                model[fnName] = (...args) => {
                    return model.methods[fnName].apply(model, [...args, storeObj]);
                }
            });
        }
    
        if(typeof model.didInstance === 'function') {
            model.didInstance(storeObj);
        }
        if(typeof model.didAllInstance === 'function') {
            modelAllInstanceCallback.push(model.didAllInstance);
        }
        // 存储下model实例
        store.setModel(model);
    });

    return {
        models,
        modelAllInstanceCallback
    }
}

export default instanceModel;