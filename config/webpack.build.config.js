const path = require("path");
const webpack = require("webpack");
const minCssExtractPlugin = require("mini-css-extract-plugin");
//单独分解出一个css 可以用map追踪
const optimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
//优化css
const friendlyErrorPlugin = require("friendly-errors-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {},
    output: {
        filename: "[name]_[hash:8].js",
        path: path.join(__dirname,'../dist'),
        /*当有对各文件要输出的时候，就需要用到chunk
        * [name]代表内置的name去替换[name] 其中[hash]代表取8位hash值，默认是20位*/
        chunkFilename: '[name].js',
        /*当配置无入口的时候输出的文件名称*/
        publicPath: '../../../../',
        //配置的是发布到线上资源的URL前缀名为string类型
        library: '[name]',
        libraryTarget: 'umd'
    },
    devtool: "source-map",
    //webpack不处理应用的某些依赖库，但仍可以使用require或import进行引用
    /*例jQuery哦我们不希望webpack将他编辑到文件中，但仍然希望能够通过import来进行引用，不编辑到文件中去是因为我们可以通过线上资源访问来进行引用 */
    externals:{
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
    }
};