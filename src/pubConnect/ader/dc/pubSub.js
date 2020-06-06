

class PubSub {

    pubSub = {}

    subscribe = (type, callback) => {
        if(!this.pubSub[type]) {
            this.pubSub[type] = []
        }

        this.pubSub[type].push(callback);
    }

    unSubscribe = (type, fn) => {
        let callbackList = [...this.pubSub[type]];
        if(fn) {
            if(callbackList && Array.isArray(callbackList)) {
                this.pubSub[type].map((item, index) => {
                    if(item === fn) {
                        callbackList.splice(index, 1);
                    }
                });
                this.pubSub[type] = callbackList;
            }
        }
        else {
            this.pubSub[type] = [];
        }
    }

    publish = (type, ...others) => {
        let callbackList = this.pubSub[type];
        if(callbackList && Array.isArray(callbackList)) {
            callbackList.map((fn) => {
                if(typeof fn === 'function') {
                    fn.apply(fn, others);
                }
            });
        }
    }

}

export default new PubSub();