var webpack = require('webpack');
var path =require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//单独分解出一个css 可以用map追踪
const friendlyErrorPlugin = require("friendly-errors-webpack-plugin");
module.exports = {
    devtool: "inline-source-map",
    entry:{
        app:path.join(__dirname,'src','applet/DotaExcesices/Ker/main/index.js')
    },
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'../dist'),
        publicPath: "/"
    },
    module: {//module配置如何去处理模块
        //1.rule 配置模块的读取和解析规则
        //1.2.noParse 配置项可以让webpack忽略对部分没采用模块化的文件的递归解析和处理，例如jquery这种庞大且没有模块化标准的，直接去忽略他
        //  直接被忽略的文件中不应该包含import require define等模块化语句
        // 1.3.parse属性可以控制哪些模块语法要解析 例如amd commonjs harmony requireJs
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },{
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            mode: 'local',
                            modules: true,
                            localIdentName: '[name]--[local]--[hash:base64:5]'
                        }
                    },
                    'postcss-loader'
                ]
            },{
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|xlsx)(\?.+)?$/,
                exclude: /favicon\.png$/,
                use: [{
                    loader: 'url-loader'
                }]
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({                 //添加在这里
        //     template: path.resolve(__dirname,'src','applet/DotaExcesices/Ker/main/index.html'),
        //     filename: 'index.html',
        //     inject: 'body'
        // }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({                 //添加在这里
            template: path.resolve(__dirname, 'src/indexOld.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        // new happyPack({
        //     loaders: ['babel-loader'],
        //     threads: 2
        // }),
        new friendlyErrorPlugin()
    ],
    //alias  配置项通过别名来把原导入路径映射成一个新的导入路径。
    //extensions 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'src': path.resolve(__dirname, '../src/')
        }
    },
    devServer: {
        // —它指定了服务器资源的根目录，如果不写入contentBase的值，那么contentBase默认是项目的目录。
        contentBase: path.join(__dirname, "dist"),
        stats:"errors-only",
        port: 7003,
        historyApiFallback:{
            rewrites:[
                {from:/./,to:'/404.html'}
            ]
        }
    }
};