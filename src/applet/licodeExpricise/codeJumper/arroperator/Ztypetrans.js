/*
* 将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：

L   C   I   R
E T O E S I I G
E   D   H   N
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);
示例 1:

输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"
示例 2:

输入: s = "LEETCODEISHIRING", numRows = 4
输出: "LDREOEIIECIHNTSG"
解释:

L     D     R
E   O E   I I
E C   I H   N
T     S     G
*/
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if(numRows === 1){
        return s
    }
    let ori = s.split('');
    let result = new Array(numRows);
    let tempReplace = [];
    for(let i=numRows,j=0;i>0;i--,j++){
        tempReplace.length = 0;
        if(i === numRows || i=== 1){
            let index = j+2*j*(numRows-1);
            while (index<ori.length-1){
                tempReplace.push(ori[index])
            }
        }
    }
    // 决定第1行 0 2n-2 4n-4 空隙为2n-2
//    第二行 1 2(n-1)-2 2n-2
};