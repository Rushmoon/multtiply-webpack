let initReduce = {
    allData:[], // 仿所有数据
    display:false, //是否显示
    severName: '', //服务名称
    serverType: '', //服务类型
    range: '', // 等级
} //这几种情况要更新的所有数据才会放这里，可能数据存在互斥，但一定都会用到

const reduce = (state = initReduce,actions) =>{
    let newState = state;
    switch (actions.type) {
        case 'ALL_DATA':

            break;
        case 'SERVER_DISPLAY':

            break;
        default:
            break;
    }
};
export default reduce