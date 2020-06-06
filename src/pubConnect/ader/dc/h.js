// 工具类

// 获取数据类型
export const getType = (data) => {
    let str = {}.toString.call(data);
    return str.substring(8, str.length - 1);

}

export const deepCopy = (originData) => {
    let result = null;

    let dataType = getType(originData);

    if(
        dataType === 'String' || 
        dataType === 'Number' || 
        dataType === 'Boolean' ||
        dataType === 'Null' ||
        dataType === 'Undefined' ||
        dataType === 'Function'
    ) { 
        result = originData
    }
    else if(dataType === 'Object') {
        result = {};
        Object.keys(originData).map((key) => {
            result[key] = deepCopy(originData[key]);
        });
    }
    else if(dataType === 'Array') {
        result = originData.map((item) => {
            return deepCopy(item);
        });
    }

    return result;
 }