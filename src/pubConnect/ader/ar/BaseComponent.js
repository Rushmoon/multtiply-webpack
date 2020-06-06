import React, { Component } from 'react';

import pubSub from './pubSub';
import extend from './extends';

// 内建方法列表
const builtInMethods = [
	'didMount',
	'didUpdate',
	'willUnMount',
	'didAllInstance',
	'didInstance',
	'shouldComponentUpdate'
];

class BaseComponent extends Component {
	constructor(props) {
		super(props);

		this.loadActions = this.loadActions.bind(this);
	}

	methods = {
		didMount: [],
		didUpdate: [],
		willUnMount: [],
		didAllInstance: [],
		didInstance: [],
		shouldComponentUpdate: []
	};

	loadActions() {
		if (this.action === undefined) {
			this.action = {};
		}
		Object.keys(this.actions).map((key) => {
			// 实例化每个action
			let action = new this.actions[key](this);
			// 给每个action添加订阅发布
			action.pubSub = pubSub;
			// 将extend合并到action里
			extend(action, this);

			this.action[key] = action;

			builtInMethods.map((item) => {
				if (typeof action[item] === 'function') {
					this.methods[item].push(action[item].bind(action));
				}
			});

			if (typeof action['didInstance'] === 'function') {
				action['didInstance'].call(action);
			}
		});
		// 所有action实例化执行完成之后执行
		this.methods['didAllInstance'].map((fn) => {
			if (typeof fn === 'function') {
				fn();
			}
		});
	}

	componentDidMount() {
		this.methods['didMount'].map((fn) => {
			fn();
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.methods['didUpdate'].map((fn) => {
			fn(prevProps, prevState, snapshot);
		});
	}

	componentWillUnmount() {
		this.methods['willUnMount'].map((fn) => {
			fn();
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		let result = false;

		this.methods['shouldComponentUpdate'].map((fn) => {
			if (fn(nextProps, nextState)) {
				result = true;
			}
		});

		if (this.methods['shouldComponentUpdate'].length <= 0) {
			return true;
		}

		return result;
	}
}

export default BaseComponent;
