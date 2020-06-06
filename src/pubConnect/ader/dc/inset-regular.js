import {getType} from './h';

const insetRegular =  {
    // 判断值是否为空，为定义，null，或者空对象，空数组
    required(value) {

        if(value === '' || value === undefined || value === null) {
            return {
                verification: false
            }
        }
        
        let type = getType(value);

        if(type === 'Object') {
            return {
                verification: Object.keys(value).length  > 0
            }
        }

        if(type === 'Array') {
            return {
                verification: value.length > 0
            }
        }

        return {
            verification: true
        };
    },
    email(value) {
        
    },
    // 扩展内置的验证方法
    extendRegular: (regularObject = {}) => {
        Object.keys(regularObject).forEach((name) => {
            insetRegular[name] = regularObject[name]
        });
    }
}

export default insetRegular