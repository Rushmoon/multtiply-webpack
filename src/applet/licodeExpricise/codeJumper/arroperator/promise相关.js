class PubSub {
    pubSub = {};
    subscribe = (type,fn)=>{
        if(!this.pubSub[type]){
            this.pubSub[type] = []
        }
        this.pubSub[type].push(fn)

    };
    publish = (type,...args)=>{
        let callBackList = [...this.pubSub[type]];
        if(Array.isArray(this.pubSub[type]) && callBackList.length > 0){
            this.pubSub[type].map(item => {
                item.apply(item,args);
            })
        }else {
            console.log('检测type是否存在语法错误')
        }
    };
    unSubscribe = (type,fn)=>{
        let callBackList = [...this.pubSub[type]];

        if(Array.isArray(this.pubSub[type]) && callBackList.length > 0){
            if(fn){
                this.pubSub[type].map((item,index) => {
                    if(fn === item){
                        callBackList.splice(index,1);
                    }
                })
            }else {
                this.pubSub[type] = [];
            }

        }else {
            console.log('检测type是否存在语法错误')
        }
    }
}
