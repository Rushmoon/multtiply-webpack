/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
//voyage 是翻转后的前序遍历数组
//    思路，将正常的与翻转后的数组节点都变成按层分割的数组，之后比对，不同的话，不是同一层不行，相隔不行，其他都可
var minCameraCover = function(root,voyage) {
    let result = [];
    let cResult = [];

    function searchTree(root,deep) {
        if(root.val){

            let temp = voyage.unshift();
            if(result[deep] instanceof array){
                result[deep].push(root.val);
                cResult[deep].push(temp)
            }else {
                result[deep] = [root.val];
                cResult[deep] = [temp]
            }
        }
        if(root.left){
            searchTree(root.left,deep + 1)
        }
        if(root.right){
            searchTree(root.right,deep + 1)
        }
    }
    searchTree(root,0);
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
let tree5 = new TreeNode(13);
// let tree7 = new TreeNode(4);
// let tree8 = new TreeNode(7);
// let tree6 = new TreeNode(13);
// let tree9 = new TreeNode(2);
// let tree10 = new TreeNode(5);
tree1.left = tree2;
tree2.left = tree3;
tree3.left = tree4;
tree4.right = tree5;
minCameraCover(tree1,[2,3,1]);
