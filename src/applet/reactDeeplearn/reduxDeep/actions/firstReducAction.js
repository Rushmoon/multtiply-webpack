export default class{
    myajax = () =>{
        console.log('you have request the Data')
    };
    handletheData = (dispatch)=>{
        this.myajax();
        let dataList = ['hahaha'];
        dispatch({
            type:"ALL_DATA",
            dataList
        })
    };
    changeDataDisplay = (id) =>{
        return (dispatch)=>{
            let mapList = {
              id:id
            };
            dispatch({
                type:'SERVER_DISPLAY',
                mapList
            })
        }
    }
}
