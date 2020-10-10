/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var findLeaves = function(root) {
    const helper = (root) => {
        if (!root) {
            return null
        }
        if (!root.left && !root.right) {
            res[i].push(root.val)
            return null
        }
        root.left = helper(root.left)
        root.right = helper(root.right)
        return root
    }
    let res = []
    let i = 0
    while (root) {
        res[i] = []
        root = helper(root)
        i++
    }
    return res
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
findLeaves(tree1);
