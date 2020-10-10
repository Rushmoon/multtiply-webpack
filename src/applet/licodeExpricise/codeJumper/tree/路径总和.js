/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    let currentSum = 0;
    let result = [];
    function searchTree(root,currentSum,currentArr){
        if(currentSum + root.val === sum){
            if(!root.left && !root.right){
                result.push(currentArr.concat([root.val]))
            }
        }
            if (root.left){
                searchTree(root.left,currentSum + root.val,currentArr.concat([root.val]))
            }
            if(root.right){
                searchTree(root.right,currentSum + root.val,currentArr.concat([root.val]))
            }
    }
    if(root){
        searchTree(root,currentSum,[]);
    }
    console.log(result);
    return result
    };
function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
let tree1 = new TreeNode(5);
let tree2 = new TreeNode(4);
let tree3 = new TreeNode(8);
let tree4 = new TreeNode(11);

let tree7 = new TreeNode(4);
let tree8 = new TreeNode(7);
let tree6 = new TreeNode(13);
let tree9 = new TreeNode(2);
let tree10 = new TreeNode(5);
tree1.left = tree2;
tree1.right = tree3;
tree2.left = tree4;
tree3.left = tree7;
tree3.right = tree6;
tree4.left = tree8;
tree4.right = tree9;
tree4.right = tree9;
tree7.left = tree10;
pathSum(tree1,22);
