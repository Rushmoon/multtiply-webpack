/*
给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。
示例 1:
输入: [1,2,0]
输出: 3

示例 2
输入: [3,4,-1,1]
输出: 2

示例 3:
输入: [7,8,9,11,12]
输出: 1

提示：
你的算法的时间复杂度应为O(n)，并且只能使用常数级别的额外空间。
* */
var firstMissingPositive = function(nums) {
    if(nums.length === 0){
        return 1
    }
    if(nums.length === 1 && nums[0]!==1){
        return 1
    }else if(nums.length === 1 && nums[0]===1){
        return 2
    }
     nums.sort(function (a,b) {
        return a-b
    });
     if(nums[0] > 1 || nums[nums.length-1] < 1){
         return 1
     }
     let result = 0,i=1;
    for(let j=0;j<=nums.length-1;j++){
        if(i > nums[j]){
            continue
        }
        if(nums[j] === i){
            i++
        }
        if(nums[j] > i){
            result  = i;
            break
        }
    }
    if(result === 0){
        return nums[nums.length-1]+1
    }else {
        return result
    }
};
console.log(firstMissingPositive([1,2,0]))