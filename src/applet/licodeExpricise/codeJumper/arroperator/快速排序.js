function hurrySort(start,end,content) {

    if (start >= end) {
        return content
    }

    let i = start;
    let j = end;
    let temp = content[start];

    while (i < j) {
        while (content[j] >= temp && i < j) {
            j--
        }
        while (content[i] <= temp && i < j) {
            i++
        }

        if (i < j) {
            let comp = content[i];
            content[i] = content[j];
            content[j] = comp;
        }
    }
    content[start] = content[i];
    content[i] = temp;
    hurrySort(start, i - 1, content);
    hurrySort(i+1, end, content);
    return content;
}
let arr = [3,1,4,1,5,9,2,6,5,3,5,7,9];
console.log(hurrySort(0,arr.length-1,arr));
