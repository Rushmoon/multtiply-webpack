const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const webpackDevSever = require('webpack-dev-server');
const webpackDevConfig = require('./webpack.dev.config');
const config = require('../config.json');
const getEntry = require('./enter.js');


const h = require("./hammer.js");
let projectPath = path.join(__dirname, '../');
let targetPath = webpackDevConfig.output.path;

// 入口对象集
let entryTmp = getEntry();

// 取出js入口路径
let entries = entryTmp.entry;

// 取出模版路径
let entryTmpMap = entryTmp.template;


// copyDir();
runCompire(['applet']);
function copyDir(){
    config.copy.map(obj=>{
        let objFrom = path.join(projectPath,obj.from);
        let objTo = path.join(targetPath,obj.to);

        if(!h.isFileExist(objTo)){
            h.copyDirSync(targetPath,objFrom,objTo)
        }

    })
}
function runCompire(m) {
    let reg = new RegExp(m.join('|'));
    let tempEntry = {};
    console.log(reg);
    Object.keys(entries).map(item=>{
        if(reg.test(item)){
            tempEntry[item] = entries[item]
        }
    });
    entries = tempEntry;
    console.log(entries);
    let runConfig = {
        ...webpackDevConfig,
        plugins:[...webpackDevConfig.plugins],
        entry:entries
    };
    runConfig.plugins.push()
}