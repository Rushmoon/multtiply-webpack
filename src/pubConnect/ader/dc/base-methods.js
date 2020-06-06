import store from './store';

import { deepCopy, getType } from './h';

import insetRegular from './inset-regular';
import pubSub from './pubSub';
import { subscribeName } from './constant';

// 按照 option给的顺序读取值
// 输入a.b.c.d 输出 [a,b,c,d]
function readObject(option, data) {
	// 如果给的参数不是数组直接返回
	if (!Array.isArray(option)) {
		return;
	}
	// 如果数组长度为0直接将data返回,不需要做任何处理
	if (option.length === 0) {
		return {
			value: data
		};
	}

	// 从数组里拿第一个key
	let currentKey = option.shift();
	// 取出第一个key对应的数据
	let value = data[currentKey];

	// 如果拿完第一个数据后数组变为0，就把值返回去
	if (option.length === 0) {
		return {
			key: currentKey,
			value: value
		};
	}

	// 如果结下来的数据不是数组或者对象，也把数据返回去，因为无法继续往下读取
	if (!/(Object)|(Array)/.test(getType(value))) {
		return {
			key: currentKey,
			value: value
		};
	} else {
		// 如果是数组对象，就递归的读取接下来的值
		return readObject(option, value);
	}
}

// 切割传入的参数
// 'a.b.c.d' => [a,b,c,d]
// 'a[0].b.c[0]' => [a, 0, b, c, 0]
function cuttingKey(option) {
	// 存储最终结果
	let optionList = [];
	// 将参数按照[分割，分割后数组的第一项就一定不包含数组读取
	let arr = option ? option.split('[') : [];

	// 如果没有 [ 那么就就说明不存在数组读取
	if (arr.length === 1) {
		optionList = arr[0].split('.');
	} else {
		// 将第一项按照 .  分割
		optionList = arr[0] ? arr.shift().split('.') : [];
		// 遍历剩下的项
		arr.forEach((item) => {
			// 剩下的每一项，里面只可能包含一个 ]
			// 所以按照 ] 分割后第一项是key，剩下的按照 . 分割就可
			let arr2 = item.split(']');

			optionList.push(arr2[0]);

			let afterMidBrackets = arr2[1].replace(/^\./, '');

			if (afterMidBrackets) {
				optionList = optionList.concat(afterMidBrackets.split('.'));
			}
		});
	}

	return optionList;
}

function getData(option = '', regular) {
	// 切割参数
	let optionList = cuttingKey(option);

	let data = store.getData();

	let value = readObject(optionList, data);

	pubSub.publish(subscribeName.CALL_GET_DATA, option, value, regular);

	if (regular === undefined) {
		return {
			...deepCopy(value)
		};
	} else {
		let regType = getType(regular);
		let verifyInfo = [];

		if (regType === 'Array') {
			regular.forEach((reg, index) => {
				let res = verifyValue(value, reg);

				verifyInfo.push(res);
			});
		} else {
			let res = verifyValue(value, regular);
			verifyInfo.push(res);
		}

		return {
			...deepCopy(value),
			verifyInfo: verifyInfo
		};
	}
}

function setData(option = '', value) {
	let optArr = cuttingKey(option);

	let modelName = optArr.shift();
	let data = store.getData(modelName);
	let optLength = optArr.length;

	let midData = data;

	if (optLength === 0) {
		data = value;
	} else if (optLength === 1) {
		data[optArr[0]] = value;
	} else if (optLength > 1) {
		for (let i = 0; i < optLength; i++) {
			let currentKey = optArr[i];
			let type = getType(midData[currentKey]);
			let isArrayKey = /\[\d+\]/.test(currentKey);
			let index = 0;

			if (isArrayKey) {
				let keyArray = currentKey.split('[');

				currentKey = keyArray[0];
				index = Number(keyArray[1].replace(']', ''));
				type = getType(midData[currentKey]);

				if (type !== 'Array') {
					midData[currentKey] = [];
				}

				midData = midData[currentKey];
				currentKey = index;
				type = getType(midData[currentKey]);
			}

			// 如果当前这个key是字符串
			if (
				type === 'String' ||
				type === 'Number' ||
				type === 'Boolean' ||
				type === 'Undefined' ||
				type === 'Null'
			) {
				// 如果不是最后一个，那么给这个变成空对象
				if (i !== optLength - 1) {
					midData[currentKey] = {};
				}
			}

			// 如果当前这个已经是最后一个了， 那么就把值赋给它
			if (i === optLength - 1) {
				midData[currentKey] = value;
			} else {
				midData = midData[currentKey];
			}
		}
	}

	store.setData(modelName, data);

	pubSub.publish(subscribeName.CALL_SET_DATA, option, value);
}

function verifyValue(value, reg) {
	let type = getType(reg);

	if (type === 'String' && insetRegular[reg]) {
		let res = insetRegular[reg](value.value);

		return {
			...res,
			regularType: reg
		};
	} else if (type === 'RegExp') {
		let res = reg.test(value.value);

		return {
			verification: res,
			regularType: reg.toString()
		};
	} else if (type === 'Function') {
		let res = reg(value.value);

		return {
			verification: res,
			regularType: 'function'
		};
	}

	return {
		verification: false,
		regularType: reg
	};
}
function isObject(checkobj) {
	let type = '';
	if (typeof checkobj === 'object' && checkobj !== null && !Array.isArray(checkobj)) {
		if (JSON.stringify(checkobj) === '{}') {
			type = 'emptyObject';
		} else {
			type = 'Object';
		}
	} else {
		type = 'notObject';
	}
	return type;
}
function setDatas(modelName, obj, callback) {
	let data = store.getData(modelName);
	if (isObject(obj) !== 'Object') {
		throw '请传入非空对象数据!';
	} else {
		for (let key in obj) {
			if (data.hasOwnProperty(key)) {
				data[key] = obj[key];
				// Object.defineProperty(data, key, {
				// 	value: obj[key]
				// });
			}
		}
		store.setData(modelName, data);
		pubSub.publish(subscribeName.CALL_SET_DATA, modelName, data);
		if (typeof callback === 'function') {
			setTimeout(() => {
				callback();
			}, 0);
		}
	}
}
export default () => {
	return {
		getData: getData,
		setData: setData,
		verifyValue: verifyValue,
		setDatas: setDatas
	};
};
