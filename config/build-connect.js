const path = require("path");
const webpack = require('webpack');
const webpackProdConfig = require("./webpack.build.config.js");
const getEnter = require('./enter');
const hammer = require('./hammer');
const config = require('../config.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//在默认情况下，此插件将删除output.path 在每次成功重建后删除webpack 目录中的所有文件以及所有未使用的webpack 的静态资源（基本不需要传参，会直接只想output.path）
const CopyPlugin = require('copy-webpack-plugin');
//webpack拷贝插件，拷贝config目录里面对应的所有静态资源,或者一些组件

let Plugins = [...webpackProdConfig.plugins];
//插件列表
let enter = getEnter();
// let libEnter = getEnter('lib');
let enterMap = enter.entry;
let enterTemplateMap = enter.template;
let inputName = [].slice.call(process.argv,2);
//由于arguments是一个对象或者说是一个伪数组，原型链上并没有slice这个方法，所以使用这种写法，（将对象转化为数组，并截取）
//上述的意思是将输入的从第二个之后开始，到最终的所有
let resultEnter = {};
//便利所有入口的key，根据输入的模块名筛选enterMap
Object.keys(enterMap).map((key)=>{
    if(inputName && inputName.length > 0) {
        for(let M of inputName){
            if(key.includes(M)){
                //es6字符串新方法
                resultEnter[key] = enterMap[key];
                break;
            }
        }
    }else {
        resultEnter[key] = enterMap[key];
    }
});
console.log("resultEnter",resultEnter);


// 之后会切割入口文件以提升速度，这个变量就是存储切割后的入口数组
let entryList = [];
// 切割入口文件的时候用到的临时中转变量
let cache = {};
























//
// // 项目根目录
// const projectPath = path.join(__dirname, '../');
//
// // 输入参数，hrhi  hrwa 什么的
// const inputParam = [].slice.call(process.argv, 2);
//
// let runType = inputParam[0];
//
// if(runType === 'patch') {
//     inputParam.shift();
// }
//
// // 参数拼装的正则，要是没有参数这个值为false
//
// // 页面入口对象和模版集合
// let entry = getEntry();
// // 模块入口对象
// let libEntry = getEntry('lib');
// // 入口对象
// let entryMap = entry.entry;
// // 自定义模版map
// let entryTemplateMap = entry.template;
// // 模块入口对象
// let libEntryMap = libEntry.entry;
//
// //过滤lib
// let libEntryMapModule = {};
// if (inputParam && inputParam.length > 0) {
//     let reg = new RegExp(`^(${inputParam})`);
//     for (let key in libEntryMap) {
//         if (reg.test(key)) {
//             libEntryMapModule[key] = libEntryMap[key];
//         }
//     }
// } else {
//     libEntryMapModule = libEntryMap;
// }
//
// if(Object.keys(libEntryMapModule).length <= 0) {
//     libEntryMapModule = libEntryMap;
// }
//
// // 临时中间变量，用于过滤参数选择的入口
// let midTrans = {};
// // 通过过滤入口的key值，找到对应的map
// Object.keys(entryMap).map((key) => {
//     if (inputParam && inputParam.length > 0) {
//         let ifCurrentKeyIsEntry = false;
//         for (let p of inputParam) {
//             if (key.includes(p)) {
//                 ifCurrentKeyIsEntry = true;
//                 break;
//             }
//         }
//         if (ifCurrentKeyIsEntry) {
//             midTrans[key] = entryMap[key];
//         }
//     } else {
//         midTrans[key] = entryMap[key];
//     }
// });
// // console.log('==== 入口 ====');
// if(Object.keys(midTrans).length > 0) {
//     entryMap = midTrans;
// }
// // 拥有页面的入口的js对应的插件列表
// let pagePlugins = [ ...webpackProdConfig.plugins ];
// // 没有页面的入口的js的对应的插件列表
// let libPlugins = [ ...webpackProdConfig.plugins ];
//
// // 之后会切割入口文件以提升速度，这个变量就是存储切割后的入口数组
// let entryList = [];
// // 切割入口文件的时候用到的临时中转变量
// let cache = {};
//
// // 拿到所有入口的key值
// let entryMapKeysList = Object.keys(entryMap);
// // 所有的编译花费的时间数组
// let costTime = [];
// // 只运行一次的行为标志,主要用在了复制和clean插件上
// let firstTime = true;
//
// let allStartTime = Date.now();
//
// // 通过遍历，将数据量很大的入口对象，切割成每30个入口文件为一个的数组
// entryMapKeysList.map((key, index) => {
//     cache[key] = entryMap[key];
//
//     if (index % 20 === 0) {
//         entryList.push(cache);
//         cache = {};
//         return;
//     } else if (entryMapKeysList.length - 1 === index) {
//         entryList.push(cache);
//     }
// });

// 运行链式的编译
// runList(entryList.shift());