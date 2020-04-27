const fs = require('fs');
const path = require('path');
function writeFile(root, filePath, content) {
    console.log("root",root);
    console.log("filePath",filePath);
    console.log("content",content)

    // let sep = /\//;
    // if(/\\/.test(root)) {
    //     filePath = filePath.replace(/\//g, '\\');
    //     sep = /\\/
    // }
    //
    // let filePathList = filePath.split(sep);
    // let len = filePathList.length;
    //
    // let parentPath = path.normalize(root);
    // //将路径规范化（多个反斜杠\被规范成一个反斜杠）
    //
    // if(!this.isFileExist(parentPath)) {
    //     try {
    //         fs.mkdirSync(parentPath);
    //     }
    //     catch(e) {
    //         console.log(e);
    //     }
    // }
    //
    // filePathList.map((item, index) => {
    //     let absPath = path.join(parentPath, item);
    //
    //     if(!this.isFileExist(absPath)) {
    //         if(len - 1 !== index) {
    //             try {
    //                 fs.mkdirSync(absPath);
    //             }
    //             catch(e) {
    //                 console.log(e);
    //             }
    //         }
    //     }
    //     if(len - 1 === index) {
    //         try {
    //             fs.writeFileSync(absPath, content);
    //         }
    //         catch(e) {
    //             console.log(e);
    //         }
    //     }
    //
    //     parentPath = absPath;
    // })
}
function isFileExist(filePath){
    try {
        fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK);
        return true;
    }
    catch(e) {
        return false;
    }
}
function copyDirSync(root,src,dst) {
    let demoFiles = fs.readdirSync(src);
    demoFiles.map(file=>{
        let filePath = path.join(src,file);
        let targetPath = path.join(dst,file);
        let stat = fs.statSync(filePath);

        if(stat.isFile()){
            this.copyFile(root,filePath,targetPath);
        }else if(stat.isDirectory()){
            this.copyDirSync(root,filePath,targetPath);
        }
    })
    // console.log(demoFiles);
}// 复制一个文件
function copyFile(root, src, dst) {
    // console.log("root",root);
    console.log("src",src);
    console.log("dst",dst);
    // let content = fs.readFileSync(src,{
    //     //     encoding: 'utf8'
    //  });
    // console.log("content",content);
    // try {
    //     let content = fs.readFileSync(src, {
    //         encoding: 'utf8'
    //     });
    //
    //     this.writeFile(root, dst.replace(root, ''), content);
    // } catch (e) {
    //     console.log('copy Error', e);
    // }
}
function Hammer() {
    this.writeFile = writeFile;
    this.isFileExist = isFileExist;
    this.copyFile = copyFile;
    this.copyDirSync = copyDirSync;
}

module.exports = new Hammer();