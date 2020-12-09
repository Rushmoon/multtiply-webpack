function sleep(time) {
    let startTime = new Date();
    while (new Date() - startTime < time) {}
    console.log('<--Next Loop-->');
}

setTimeout(() => {
    console.log('timeout1');
    setTimeout(() => {
        console.log('timeout3');
        sleep(1000);
    });
    new Promise((resolve) => {
        console.log('timeout1_promise');
        resolve();
    }).then(() => {
        console.log('timeout1_then');
    });
    sleep(1000);
});

setTimeout(() => {
    console.log('timeout2');
    setTimeout(() => {
        console.log('timeout4');
        sleep(1000);
    });
    new Promise((resolve) => {
        console.log('timeout2_promise');
        resolve();
    }).then(() => {
        console.log('timeout2_then');
    });
    sleep(1000);
});
// t1
// t1p sl t1then
// t2
// t2p sl t2then
// t3 sl
// t4 sl
