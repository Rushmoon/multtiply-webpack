// {
//     val: 1,
//         children: [
//     { val: 3, children: [Array] },
//     { val: 2, children: [] },
//     { val: 4, children: [] }
// ]
// }
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var preorder = function(root) {
    let result = [];
    function searchTree(root) {
        if(root.val){
            result.push(root.val);
        }
        if(root.children.length > 0){
            root.children.map((item,index)=>{
                searchTree(item)
            });
        }
    }
    searchTree(root);
    return result
};
