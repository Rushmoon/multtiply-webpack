/*
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。
给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
* */
function threeNumberCount(nums) {
    let result  = [];
    function sum (arr){
      return arr.reduce((pre,cur,index,array)=>{
          return pre + cur
      })
    }
    if(nums.length < 3){
        return result
    }
    let tryArr = [];
    let sortThree = (first,second,third)=>{
        tryArr.length = 0;
        tryArr.push(nums[first]);
        tryArr.push(nums[second]);
        tryArr.push(nums[third]);
        if(sum(tryArr) === 0){
            result.push(tryArr.sort().toString())
        }
        if(first === nums.length-3){
            console.log(result)
        }else if(second === nums.length-2){
            sortThree(first+1,first+2,first+3)
        }else if(third === nums.length-1){
            sortThree(first,second+1,second+2)
        }else {
            sortThree(first,second,third+1)
        }
    };
    sortThree(0,1,2);
    let finallResult = [];
    for(let i = 0;i<result.length;i++){
        if(!finallResult.includes(result[i])){
            finallResult.push(result[i])
        }
    }
    for(let j = 0;j<finallResult.length;j++){
        finallResult[j] = finallResult[j].split(',')
    }
    return finallResult
}



var threeSum = function(nums) {
    let res = [];
    let hash = {};
    for (let i = 0; i < nums.length - 2; i++) { // 每个人
        for (let j = i + 1; j < nums.length - 1; j++) { // 依次拉上其他每个人
            if (hash[nums[j]] !== undefined) { // 已经有合适自己的两人组
                res.push([nums[j]].concat(hash[nums[j]]))
                hash[nums[j]] = undefined
            } else { // 没有合适自己的两人组
                let mark = 0 - nums[i] - nums[j]
                hash[mark] = [nums[i], nums[j]]
            }
        }
    }
    return res
} // 示意代码 未AC
console.log(threeSum([-13,5,13,12,-2,-11,-1,12,-3,0,-3,-7,-7,-5,-3,-15,-2,14,14,13,6,-11,-11,5,-15,-14,5,-5,-2,0,3,-8,-10,-7,11,-5,-10,-5,-7,-6,2,5,3,2,7,7,3,-10,-2,2,-12,-11,-1,14,10,-9,-15,-8,-7,-9,7,3,-2,5,11,-13,-15,8,-3,-7,-12,7,5,-2,-6,-3,-10,4,2,-5,14,-3,-1,-10,-3,-14,-4,-3,-7,-4,3,8,14,9,-2,10,11,-10,-4,-15,-9,-1,-1,3,4,1,8,1]));
var threeSum2 = function (nums) {
    let res = []
    nums.sort((a, b) => a - b) // 先排个队，最左边是最弱（小）的，最右边是最强(大)的
    for (let i = 1; i < nums.length - 1; i++) { // C位人选
        let first = 0
        let last = nums.length - 1
        do {
            let result = nums[i] + nums[first] + nums[last]
            if (result === 0) { // 如果可以组队
                res.push([nums[i], nums[first], nums[last]])
            }
            if (result <= 0 && first < i) { // 实力太弱，把菜鸟那边右移一位
                while (nums[first] === nums[++first]); // 如果相等就跳过
            } else if (result > 0 && last > i) { // 实力太强，把大神那边右移一位
                while (nums[last] === nums[--last]);
            } else {
                break // 某一边已经没有人选了
            }
        } while (1) { }
    }
    return res
} // 示意代码 未AC

