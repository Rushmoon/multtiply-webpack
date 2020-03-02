const path = require("path");
const webpack = require("webpack");
const happyPack = require('happypack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//单独分解出一个css 可以用map追踪
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
        //当webpack构建一个可以使其他模块导入使用的库时，使用其，library为库的名字，libraryTarget为何种方式导出库
        libraryTarget: 'umd'
        /*
        * 默认为var（即导出一个变量）
        * commonjs 导出为export的一个属性    commonJS2 通过moudle.exports:moudle.export == xx导出
        * amd   导出为AMD
        * umd 导出为AMD，commonjs2或导出为root的属性*/
    },
    devtool: "source-map",
    //webpack不处理应用的某些依赖库，但仍可以使用require或import进行引用
    /*例jQuery哦我们不希望webpack将他编辑到文件中，但仍然希望能够通过import来进行引用，不编辑到文件中去是因为我们可以通过线上资源访问来进行引用
    * 对应上述的 index.js使用script引入的一些库以及第三方插件*/
    externals:{
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
    },
    resolve: {
        //alias  配置项通过别名来把原导入路径映射成一个新的导入路径。
        //extensions 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。
        extensions: ['.js','.jsx'],
        alias: {
            'src': path.resolve(__dirname, '../src/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                //happypack 插件需要在下方的plugin中创建对应的happypack/loader 会根据创建的个数来打开分别的子进程去打包对应匹配到的文件
                //此处使用有问题，回头改
                use: {
                    loader: "happypack/loader",
                    options: {
                        presets:['env','react'],
                        //对应loader中的不同的预置(env对应的是es6)
                        plugins:[
                            'transform-class-properties'
                        ]
                    }
                }
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
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|xlsx)(\?.+)?$/,
                exclude: /favicon\.png$/,
                use: [{
                    loader: 'url-loader'
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new happyPack({
            loaders: ['babel-loader']
        }),
        new OptimizeCssAssetsPlugin()
    ],

};