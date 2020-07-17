
import React from 'react';
import ReactDom from 'react-dom';

import {
	createStore,
	applyMiddleware,
	combineReducers
} from 'redux';

import reduxAsync from './redux-async';

import {
	Provider
} from 'react-redux';


function start({root, component, model}) {

	let models = {};
	// model设置可以是数组和对象，最终根据model里的name属性拼接成键值对
	let modelType = Object.prototype.toString.call(model);

	if(modelType === '[object Array]') {
		model.map((item) => {
			models[item.name] = item
		});
	}
	else if(modelType === '[object Object]') {
		models = {
			[model.name]: model
		};
	}


	// 需要根据module里的方法动态拼接出reducer
	let reducers = {};
	// 需要存储异步的方法
	let asyncMethods = {};

	Object.keys(models).map((item) => {
		// 将异步方法存储上console.log()
		asyncMethods[item] = models[item].async;

		// 此处动态生成reducer
		// redux的初始值是model里配置的data
		reducers[item] = (state = models[item].data, action) => {
			console.log(action)
			let actionType = action.type;
			// 需要过滤掉redux自身内部的action
			let ifHasPlaceName = actionType.indexOf('/') >= 0 && actionType.indexOf('@redux') < 0;
			// 因为action的type是由module.name和方法名称组成，所以需要拆分已得到方法名
			let fieldName = actionType.split('/')[0];
			let methodName = actionType.split('/')[1];

			let syncMethod = null;

			if(fieldName !== item) {
				return state;
			}

			// 如果不是redux自身的action，并且type书写符合规范
			// 就将对应方法赋值给syncMethod变量
			if(ifHasPlaceName) {
				syncMethod = models[fieldName].sync[methodName];
			}
			else {
				// 如果是书写不符合规范，则认为他直接使用了sync方法名字作为action.type
				// 那么就直接调用sync里的方法
				syncMethod = (typeof models[item] === 'object' && models[item] !== null)
					? models[item].sync[action.type]
					: null;
			}

			// 如果有同步方法就调用
			if(syncMethod) {
				return syncMethod(state, action.payload);
			}
			else {
				return state;
			}
		}
	});

	// 调用redux的combine方法合并reducer
	// 同时调用异步中间件，把异步方法传入进去
	const store = createStore(combineReducers(reducers), applyMiddleware(reduxAsync(asyncMethods)));

	// 利用react-redux的Provider生成容器组件
	const Wrapper = () => {
		return (
			<Provider store={store}>
				{component}
			</Provider>
		);
	};


	// 渲染
	ReactDom.render(<Wrapper/>, root);

	return store;
}


export default start;
