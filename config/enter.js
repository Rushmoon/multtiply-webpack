//glob对文件名的一种创建规则筛选，大部分是异步的，其中使用sync方法则可以造成同步
/*
enter文件是用glob去检测config文件里的路径所对应的文件是否存在，如果存在，则会被
录用到entry中去，最终返回一个对象对象见40行 （使进入路径与模板分开管理）
* */
const glob = require('glob');
const config = require("../config.json");

module.exports = (type = "entry") => {
    let files = [];
    let entry = {};
    let entryTemplateMap = {};
    config[type].map((item)=>{
        if(typeof item === 'object'){
            glob.sync(item.entryPath).map((itemed)=>{
                files.push({
                    entryPath:itemed,
                    template:item.template
                })
            })
        }else {
            console.log(glob.sync(item));
            files = files.concat(glob.sync(item))
        }
    });
    files.map((item)=>{
        let key = "";
        let entryPath = "";
        if(typeof item === 'object'){
            key = item.entryPath.replace('../src/','').slice(0,-3);
            entryTemplateMap[key] = item.template;
            entryPath = item.entryPath;
        }else {
            key = item.replace('../src/','').slice(0,-3);
            entryPath = item;
        }
        entry[key] = entryPath
    });
    return{
        entry,
        template: entryTemplateMap
    }
};

