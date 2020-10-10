function feibo(n,content) {
    if(n > 2){
        let i = 2;
        while(i <= n){
            naqie(i,content);
            i++;
        }
    }
    console.log(content[content.length-1])
}

function naqie(n,content) {
    let result = content[n-1]+content[n-2];
    content.push(result);
    return content
}
let content = [0,1];
feibo(10,content);
