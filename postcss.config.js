//用来解决打包时postCss报错的问题
module.exports = {
    plugins: [
        require('autoprefixer')//自动添加css前缀
    ]
};