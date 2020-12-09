async function f() {
    console.log(1);
    await async2();
    //
    console.log(3)
}
async function async2(){
    await async3();
    console.log(2)
}
f();
new Promise((resolve)=>{
    console.log(4);
    resolve()

}).then(()=>{
    console.log(5)
});
new Promise((resolve)=>{
    console.log(6);
    resolve()

}).then(()=>{
    console.log(7)
});
function async3(){
    return new Promise((resolve)=>{
        console.log(8);
        resolve()

    }).then(()=>{
        console.log(10)
    });
}
setTimeout(()=>{
    console.log(11)
},0);

//1 8  4  6 10 5 7 2 3 11
