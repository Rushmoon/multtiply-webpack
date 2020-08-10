/*
给定一个未排序的整数数组，找出最长连续序列的长度。

要求算法的时间复杂度为 O(n)。

示例:

    输入: [100, 4, 200, 1, 3, 2]
输出: 4
解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    if(nums.length === 0){
        return 0
    }else if(nums.lnegth === 1){
        return 1
    }
    let arr = nums.sort(function (a,b) {
        return a-b
    });
    function sum (arr){
        return arr.reduce((pre,cur,index,array)=>{
            return pre + cur
        })
    }
    let result = [];
    for (var i = 0; i < arr.length; i ++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i]);
        }
    }
    console.log(result);
    result.push(result[result.length-1]+2);
    let resLength = [];
    result.map((item,index)=>{
        if( index > 0 && (item - result[index-1]) !== 1){
            if(resLength.length === 0){
                resLength.push(index)
            }else{
                resLength.push(index-sum(resLength))
            }
        }
    });
    console.log(resLength);
    let rrre = 1;
    resLength.map((item)=>{
        if(item > rrre){
            rrre = item
        }
    });
    console.log(rrre);
    return rrre

};
longestConsecutive([100,4,200,1,3,2]);