const path = require("path");
const webpack = require('webpack');
const webpackProdConfig = require("./webpack.build.config.js");
const getEnter = require('./enter');
const hammer = require('./hammer');
const config = require('../config.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//在默认情况下，此插件将删除output.path 在每次成功重建后删除webpack 目录中的所有文件以及所有未使用的webpack 的静态资源（基本不需要传参，会直接只想output.path）
const CopyPlugin = require('copy-webpack-plugin');
//webpack拷贝插件，拷贝config目录里面对应的所有静态资源,或者一些组件
const originalPath = path.join(__dirname,'../');
let Plugins = [...webpackProdConfig.plugins];
//插件列表
let enter = getEnter();
// let libEnter = getEnter('lib');
let enterMap = enter.entry;
let enterTemplateMap = enter.template;
let inputName = [].slice.call(process.argv,2);
console.log("runType? = ",inputName[0]);
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
// console.log("resultEnter",resultEnter);

let firstStructure = true;
//用于判断是否是第一次构建，如果是第一次构建的话，删除之前的dist
// 之后会切割入口文件以提升速度，这个变量就是存储切割后的入口数组
let entryList = [];
// 切割入口文件的时候用到的临时中转变量
let cache = {};
//切割成每20个文件一个对象，然后将这些对象依次进栈，执行的时候按顺序出栈，直到栈空为止
//切割入栈
let enterMapArray = Object.keys(resultEnter);
enterMapArray.map((key,index)=>{
    cache[key] = resultEnter[key];
    if(index%10 === 0){
        entryList.push(cache);
        cache = {};
    } else if(enterMapArray.length-1 === index && cache!=={}) {
        entryList.push(cache)
    }
});
runList(entryList.shift());
//函数启动入口，递归直到栈空
function runList(enterObj) {
    structure(enterObj).then(()=>{
        if(entryList.length > 0){
            structure(entryList.shift());
        }
        else {
            console.log("全部打包完成");
        }
    },()=>{
        console.log("项目打包失败!");
    })
}
function structure(entry) {
    return new Promise((resolve, reject) => {
        let currentPlugin = [ ...Plugins ];
        //创建对应这组入口临时的一个webpack配置，
        // 然后运行
        if(firstStructure){
            firstStructure = false;
            //第一组出栈时，要清除dist中原有的，创建一个新的，所以此时用cleanwebpackplugin插件，来进行删除
            currentPlugin.unshift(new CleanWebpackPlugin({
                verbose:true
            }));
        }
        //循环将要成为webpack中的entry（入口配置）的entry，为他们分别建立模板，配置需要使用htmlwebpackplugin插件
        //首先时要配置默认的，其次是配置存在指定模板的吗
        Object.keys(entry).map((key)=>{
            let htmlOption = {
                template:path.join(originalPath,config["default-template"]),
                filename:`${key}.html`,
                inject: true,
                chunks:[ key ]
                // 当webpack的配置的entry是多个时chunks默认会将所有的entry中的入口的js全部引入，所以此时，我们需要配置下，只让他引入对应的即可
            };
            if(enterTemplateMap[key]){
                htmlOption.template = path.join(originalPath,enterTemplateMap[key]);
            }
            currentPlugin.push(
                new HtmlWebpackPlugin(htmlOption)
            )
        },(err)=>{
            console.log("项目build失败",err)
        });
        webpackProdConfig.plugins = currentPlugin;
        webpackProdConfig.entry = entry;
        webpack(webpackProdConfig,(err,stats)=>{
            // console.log("stats:",stats);
            if(err){
                reject();
            }
            console.log(stats.toString({
                chunks: false,  // Makes the build much quieter
                colors: true    // Shows colors in the console
            }));
            // 对打包的配置化，如果打包的时候有错误我们就抛出错误，我们可以在webpack()回调里拿到一个stats打包状态，
            // process.stdout.write跟console.log一个意思
            // 因为在node环境里console.log也是用process封装的就是向cli里打印输出。但是输出的时候进行了一些格式化。
            // colors ： 让打包的时候有颜色。 module : 去掉内置模块信息 children ：去掉子模块
            // chunks : 增加包信息（设置为 false 能允许较少的冗长输出）chunkModules : 去除包里内置模块的信息
            let time = stats.endTime - stats.startTime;
            console.log("单次耗时：",time);
            resolve();
        })
    });

}