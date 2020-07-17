## 说明

> 模仿了之前的tarot的接口，整合action和reducers，使每个项目只需要一个model.js文件就可以书写逻辑

## 用法

#### start({root<docEle>, component<ReactElement>, models<Object|Array>})
> 入口，创建store，renderdom，初始化store，

- root: dom节点，根节点
- component: react组件
- models: 数据model

#### connect(component<React Component>)
> 用法基本和react-redux的相同，只不过不需要传递mapstate和mapdispatch，默认全部传递

#### dispatch({type: 'testPage/changeName', payload: {name: 'xxx'}})

> 使用connect包装过的组件，会在props拥有dispatch方法，而且不需要写action creator，type类型用`/`分开，斜杠前是model的name，斜杠后是方法的名称， payload会在对应的方法的第二个参数出现




例子：
```javascript

import React from 'react';
import Home from '../container';

import {start} from '../../common/stores';

import model from '../model';

start({
	root: document.getElementById('root'),
	component: <Home />,
	model: [model]
});

```



models例子：
```javascript
export default {
	name: 'testPage',
	data: {
		name: 'lingyun',
		age: '18'
	},
	sync: {
		changeName: (state, payload) => {
			return {
				name: payload.name
			};
		}
	},
	async: {
		changeAge: (dispatch, getState, payload) => {
			setTimeout(() => {
				dispatch({
					type: 'changeName',
					payload: {
						name: payload.name
					}
				});
			}, 2000);
		}
	}
};

```

> `注意：有一点一定要注意，sync和async方法，不要重名，否则只会调用async里的方法。`


组件使用例子：
```js
import React, {Component} from 'react';

import {connect} from "../../common/stores";

class Home extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	shouldComponentUpdate() {
		return true;
	}

	handleClick() {
		this.props.dispatch({
			type: 'testPage/changeName',
			payload: {
				name: 'iii'
			}
		});
		this.props.dispatch({
			type: 'testPage/changeAge',
			payload: {
				name: 'kkkkkk'
			}
		});
	}

	render() {

		return (
			<div>
				<div>
					{this.props.testPage.name}
				</div>
				<button
					onClick={this.handleClick}
					type="button"
				>
					我是大按钮
				</button>
			</div>
		);
	}
}

export default connect(Home);

```
