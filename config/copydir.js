const fs=require("fs");
const path=require("path");
var Old=path.join(__dirname,"../src",'applet/reactcomponents/souReactTable/main');
var New=path.join(__dirname,"../dist",'applet/reactcomponents/souReactTable/main');

function cpdir(dirOld,dirNew){
    console.log(dirNew);
    var p=new Promise(function(resolve, reject) {
        var i=0;
        fs.readdir('../dist',function(err,list){
            console.log(list)
            list.forEach(item=>{
                if(item=="old"){
                    reject("文件夹已存在");
                    i=i+1;
                }
            });
            if(i==0){
                fs.mkdir(path.join(dirNew,"old"),function(err){
                    resolve("创建文件夹成功！");
                    dirNew=path.join(dirNew,"old");
                    walkDir(dirOld,dirNew);
                });
            }
        });
        function walkDir(dirOld,dirNew){
            var list=fs.readdirSync(dirOld);
            console.log(list)
            list.forEach(function(item){
                if(fs.statSync(path.join(dirOld,item)).isDirectory()){
                    fs.mkdirSync(path.join(dirNew,item));
                    walkDir(path.join(dirOld,item),path.join(dirNew,item));
                }else{
                    fs.copyFile(path.join(dirOld,item),path.join(dirNew,item),function(err){
                        console.log(err);
                    });
                }
            });
        }
    });
    return p;
}
cpdir(Old,New)
    .then(function(rs){
        console.log(rs);
    })
    .catch(function(rj){
        console.log(rj);
    });
