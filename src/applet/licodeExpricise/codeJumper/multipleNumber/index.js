/*
* 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

示例 1:

输入: num1 = "2", num2 = "3"
输出: "6"
示例 2:

输入: num1 = "123", num2 = "456"
输出: "56088"
说明：
"123456789"
"987654321"
* "121932631112635260"
* "121932631112635269"
num1 和 num2 的长度小于110。
num1 和 num2 只包含数字 0-9。
num1 和 num2 均不以零开头，除非是数字 0 本身。
不能使用任何标准库的大数类型（比如 BigInteger）或直接将输入转换为整数来处理。
* */
function multiply(num1, num2) {
    if(num1 === "0" || num2 === "0"){
        return "0"
    }
    let result = Array(num1.length + num2.length).fill("0");
    let arr1 = num1.split('');
    let arr2 = num2.split('');
    let clearDouble = (arr,i)=>{
        let temp = arr[i];
        if(temp >= 10){
            arr[i] = temp%10;
            arr[i-1] =parseInt(arr[i-1])+parseInt(temp/10);
            if(arr[i-1]>=10){
                clearDouble(arr,i-1)
            }
        }
    };
    let x = result.length-1;
    for(let i = arr1.length-1;i>=0;i--){
        let c = 0;
        for(let j = arr2.length-1;j>=0;j--,c++){
            result[x-c] =parseInt(result[x-c]) + parseInt(arr1[i])*parseInt(arr2[j]);
            clearDouble(result,x-c)
        }
        x = x-1
    }
    let res = result.join('');
    return res.replace(/^0*/, "")
}
console.log(multiply("123456789","987654321"));

/*
*       4 5 6
*       1 2 3
*     1 3 6 8
*     9 1 2
*   4 5 6
*   5
* */