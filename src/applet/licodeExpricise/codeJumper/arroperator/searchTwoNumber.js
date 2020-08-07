/* 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。

请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

 

示例 1:

nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0
示例 2:

nums1 = [1, 2]
 nums2 = [3, 4]
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const len = nums1.length + nums2.length, mid = Math.floor(len / 2);
    let index1 = 0, index2 = 0, res = 0, temp = 0;

    while(index1 + index2 <= len) {
        // Infinity解决空数组或者指针超出数组长度的情况
        let num1 = nums1[index1] == undefined ? Infinity : nums1[index1],
            num2 = nums2[index2] == undefined ? Infinity : nums2[index2];

        // 找到中位数，结束循环
        if(index1 + index2 == mid) {
            // 奇数情况
            res = Math.min(num1, num2);
            // 偶数情况
            if(len % 2 == 0) res = (temp + res) / 2;
            break;
        }

        // temp缓存本轮数据留待下轮使用
        if(num1 < num2) {
            index1++;
            temp = num1;
        }
        else if(num1 > num2) {
            index2++;
            temp = num2;
        }
        else {
            index1++;
            temp = num1;
            // 两个数字相等的情况，结束本轮循环，直接跳到下轮循环开始
            if(index1 + index2 == mid) continue;
            index2++;
        }
    }

    return res;
};