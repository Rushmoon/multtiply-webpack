const fs = require('fs');
const path = require('path');
function writeFile(root, filePath, content) {


    let sep = /\//;
    if(/\\/.test(root)) {
        filePath = filePath.replace(/\//g, '\\');
        sep = /\\/
    }

    let filePathList = filePath.split(sep);
    let len = filePathList.length;

    let parentPath = path.normalize(root);
    //将路径规范化（多个反斜杠\被规范成一个反斜杠）

    if(!this.isFileExist(parentPath)) {
        try {
            fs.mkdirSync(parentPath);
        }
        catch(e) {
            console.log(e);
        }
    }

    filePathList.map((item, index) => {
        let absPath = path.join(parentPath, item);

        if(!this.isFileExist(absPath)) {
            if(len - 1 !== index) {
                try {
                    fs.mkdirSync(absPath);
                }
                catch(e) {
                    console.log(e);
                }
            }
        }
        if(len - 1 === index) {
            try {
                fs.writeFileSync(absPath, content);
            }
            catch(e) {
                console.log(e);
            }
        }

        parentPath = absPath;
    })
}