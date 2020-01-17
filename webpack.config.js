var webpack = require('webpack');
var path =require('path');
module.exports = {
    entry:{
        app:path.join(__dirname,'src','index.js')
    },
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
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