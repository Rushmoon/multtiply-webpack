
export default {
    name: 'ab',

    data: {
        tree:{
            refer:'saituAsuka',
            name:'asuka',
            code:'nogizaka no asuka'
        },
        cardForm:['hoxinonanmi','yixinonanan'],
    },
    sync: {
        update:(state,payload)=>{
            return {
                ...state,
                ...payload
            };
        }
    },
    // async: {
    // }
}