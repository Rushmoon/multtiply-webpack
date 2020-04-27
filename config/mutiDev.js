const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const webpackDevSever = require('webpack-dev-server');
const webpackDevConfig = require('./webpack.dev.config');
const config = require('../config.json');

const h = require("./hammer.js");
let projectPath = path.join(__dirname, '../');
let targetPath = webpackDevConfig.output.path;



copyDir();
function copyDir(){
    config.copy.map(obj=>{
        let objFrom = path.join(projectPath,obj.from);
        let objTo = path.join(targetPath,obj.to);

        if(!h.isFileExist(objTo)){
            h.copyDirSync(targetPath,objFrom,objTo)
        }

    })
}