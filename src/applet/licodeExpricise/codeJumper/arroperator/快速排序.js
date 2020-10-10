function hurrySort(start,end,content) {
    let i = start;
    let j = end;
    let temp = content[start];
    let comp;
    if(i<j){
        while(i<j){
            while (content[i] <= temp && i<j){
                i++
            }
            while (content[j] >= temp && i<j){
                j++
            }
            if(i<j){
                comp = content[i];
                content[i] = content[j];
                content[j] = comp;
            }
        }
        console.log(hurrySort(start+1,i-1,content),temp,hurrySort(i,end,content))
        // return hurrySort(start+1,i-1,content).concat([temp]).concat(hurrySort(i,end,content))
    }else {
        return content[start]
    }
}

let arr = [3,1,4,1,5,9,2,6,5,3,5,7,9];
console.log(hurrySort(0,arr.length-1,arr));
