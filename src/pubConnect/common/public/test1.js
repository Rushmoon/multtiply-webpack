window.data = 5
var foo = {
    data :6,
    getData(){
        console.log(data)
    }
}
var div = document.getElementsByClassName('testDiv')[0]
div.addEventListener('click',foo.getData)