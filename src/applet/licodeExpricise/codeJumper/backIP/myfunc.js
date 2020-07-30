function changeIp(s) {
    let result  = [];
    function helper(s,current,step) {
        if(step === 3){
            if(s.length <= 3 && parseInt(s.slice(0,3)) <= 255){
                if(s.length >= 2 && s.charAt(0) === "0"){
                    return
                }
                let res = current + s;
                result.push(res);
                return;
            }
        }
        if(step < 3){
            let item = current.concat(s.slice(0,1)).concat('.') ;
            helper(s.slice(1),item,step + 1)
            if(s.charAt(0) !== '0'){
                item = current.concat(s.slice(0,2)).concat('.') ;
                helper(s.slice(2),item,step+1);
                if(parseInt(s.slice(0,3))<=255){
                    item = current.concat(s.slice(0,3)).concat('.') ;
                    helper(s.slice(3),item, step+1)
                }
            }
        }

    }
    helper(s,'',0);
    console.log(result);
    return result
}
changeIp('25525511135');