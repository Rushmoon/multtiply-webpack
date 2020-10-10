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
var listOfDepth = function(tree) {

};
function TreeNode(val) {
     this.val = val;
     this.left = null;
     this.right = null;
}
var searchCreateTree = function (root,deep) {
    if(root.left && root.left.val){

    }
};
var createTree = function(message) {
    if(message.length === 1){
        return new TreeNode(message[0])
    }
    // Math.pow(2,n)
    let root = new TreeNode(message[0]);

};
let TreeArray = [1,2,3,4,5,null,7,8,9,10,11,14,15,];
createTree(TreeArray);
let indexN = [];
TreeArray.map((item,index)=>{
   if(!item){
       indexN.push(index)
   }
});



// Math.pow(2,n);
// Math.pow(2,n-1) +1
// 0
//
//  1
// 2  3
// 4 5 6 7
// 8 9  10 11  null null  14 15
// 16 17
