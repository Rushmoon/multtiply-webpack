class MyPromise{
    constructor(handle){
        this.state = 'padding';// padding fulfilling rejected
        this.result = undefined;
        this.fulfillQueue = [];
        this.rejectQueue = [];
        try {
            handle(this.resolved.bind(this),this.rejected.bind(this));
        }catch (e) {
            this.rejected(e)
        }
    }
    resolved = (val)=>{
        if(this.state !== 'padding'){
            return
        }
        this.state = 'fulfilling';
        this.result = val;
        let excute = this.fulfillQueue.shift();
        while (excute){
            excute(val);
            excute = this.fulfillQueue.shift()
        }
    };
    rejected = (e)=>{
        if(this.state !== 'padding'){
            return
        }
        this.state = 'rejected';
        this.result = e;
        let excute = this.rejectQueue.shift();
        while (excute){
            excute(e);
            excute = this.rejectQueue.shift()
        }
    };
    then = (fulfilling,rejecting)=>{
        return new MyPromise((willResolve,willReject)=>{
            switch (this.state) {
                case 'padding':
                    this.fulfillQueue.push(fulfilling);
                    this.rejectQueue.push(rejecting);
                    break;
                case 'fulfilling':
                    let res = fulfilling(this.result);
                    willResolve(res);
                    break;
                case 'rejected':
                    let reject = rejecting(this.result);
                    willReject(reject);
                    break;
            }
        })
    }
}
