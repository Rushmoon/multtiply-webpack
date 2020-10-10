/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {TreeNode} tree
 * @return {ListNode[]}
 */
//输出：[[1],[2,3],[4,5,7],[8]]


var listOfDepth = function(tree) {
    let deep = 0;
    let result = Array();

    function searchTree(tree,deep){
        if(result[deep] && result[deep] instanceof Array){
            result[deep].push(tree.val);
        }else {
            result.push([]);
            result[deep].push(tree.val);
        }
        if(tree.left){
            searchTree(tree.left,deep+1)
        }
        if(tree.right){
            searchTree(tree.right,deep+1);
        }
    }
    searchTree(tree,deep);
    console.log(result)
};
function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}
let tree1 = new TreeNode(1);
let tree2 = new TreeNode(2);
let tree3 = new TreeNode(3);
let tree4 = new TreeNode(4);
let tree5 = new TreeNode(5);
let tree7 = new TreeNode(7);
let tree8 = new TreeNode(8);

tree1.left = tree2;
tree1.right = tree3;
tree2.left = tree4;
tree2.right = tree5;
tree3.left = tree7;
tree4.left = tree8;
listOfDepth(tree1);

