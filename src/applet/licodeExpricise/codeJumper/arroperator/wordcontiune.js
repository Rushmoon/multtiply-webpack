/*
给定两个单词（beginWord 和 endWord）和一个字典 wordList，找出所有从 beginWord 到 endWord 的最短转换序列。转换需遵循如下规则：

每次转换只能改变一个字母。
转换后得到的单词必须是字典中的单词。
说明:

如果不存在这样的转换序列，返回一个空列表。
所有单词具有相同的长度。
所有单词只由小写字母组成。
字典中不存在重复的单词。
你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
示例 1:

输入:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

输出:
[
  ["hit","hot","dot","dog","cog"],
  ["hit","hot","lot","log","cog"]
]
示例 2:

输入:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

输出: []
解释: endWord "cog" 不在字典中，所以不存在符合要求的转换序列。

* */

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function(beginWord, endWord, wordList) {
    function isMatchOne(str1,str2) { //判断两个字符串是否相差一个字符，顺序必须一致，长度必须一致
        let j = 0;
        for(let i=0;i<str1.length;i++){
             if(str1.charAt(i) !== str2.charAt(i)){
                 j++
             }
        }
        return j === 1
    }
    let topRoot = {};
    function createTree(root,lastList,currentWord) {
        // console.log('currentWord',currentWord,lastList);
        root.leafLength = 0;
        if(currentWord === endWord){
            root.leafLength = 1;
            root.isLeaf = true
        }else {
            for(let index = lastList.length - 1; index >= 0; index--){
                if(isMatchOne(lastList[index],currentWord)){
                    root.leafLength += 1;
                    root[lastList[index]] = {};
                    lastList.splice(index,1);
                }
            }
            for(let name in root){
                if(typeof root[name] === 'object'){
                    createTree(root[name],[].concat(lastList),name)
                }

            }

        }
    }
    function searchTree(root,result,index){
        if(root.leafLength > 1){
            let currentArr = [];
            for(let name in root){
                if(typeof root[name] === 'object'){
                    currentArr.push(name);
                    if(index === 0){
                        let newArr = result.concat([name]);
                        result.push(newArr)
                    }else {
                        let newArr = result[index-1].concat([name]);
                        result.push(newArr)
                    }
                }
            }
            if(index){
                result.splice(index-1,1)
            }else {
                result.splice(0,1)
            }
            for(let x = 1;x<=root.leafLength;x++){
                searchTree(root[currentArr[x-1]],result,index?index+x-1:x)
            }
        }else {
            for(let name in root){
                if(typeof root[name] === 'object'){
                    if(index === 0){
                        result.push(name)
                    }else {
                        result[index-1].push(name)
                    }
                    searchTree(root[name],result,index);
                    break
                }
            }
            
            
        }
    }
    let index = wordList.indexOf(beginWord);
    if(index !== -1){
        wordList.splice(index,1);
    }
    createTree(topRoot,wordList,beginWord);
     let result =[];
     searchTree(topRoot,result,0);
    console.log(result)
};
findLadders("hit","cog",["hot","dot","dog","lot","log","cog"]);