/*示例 2：
字符串翻转并去空格
输入: "  hello world!  "
输出: "world! hello"
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
示例 3：

输入: "a good   example"
输出: "example good a"
解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。


说明：

无空格字符构成一个单词。
输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
*/
function turnBackWordOfLine (s){
  if(s.length === 0){
      return ''
  }else if(s.length === 1){
      if(s === ' '){
          return ''
      }else{
          return s
      }
  }
  let currentArr = s.split(' ');
  if(currentArr.every(function (item) {return item === ''})){
        return ''
  }
  let result = [];
  currentArr.map(item=>{
      if(item !== ''){
          result.push(item)
      }
  });
  let revertArr = result.reverse();
  let resultR = revertArr.join(' ');
  return resultR
}
console.log(turnBackWordOfLine('   '));
console.log(turnBackWordOfLine('  s '));
console.log(turnBackWordOfLine(' a  bb    ccc'));
