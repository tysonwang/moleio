const path = require('path')
const HtmlWebackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.env.NODE_ENV === 'dev';
console.log('env', env)
const webpack = require('webpack')
const desc = {
    filename: env ? "[name].js" : "[name].min.js",
    targetPath: env ? path.resolve(__dirname, 'test') : path.resolve(__dirname, 'dist'),
}
const output = {
    filename: desc.filename,
    path: desc.targetPath,
    libraryExport: 'default',
    library: 'mole',
    libraryTarget: 'umd',
    sourceMapFilename: '[name].map',
}
const entry = {
    mole: './src/mole.js'
}
const devtool = env ? 'inline-source-map' : false;
const extend = {
    wx: '',      // 微信小程序
    taro: '',    //taro
    uniapp: '',  //uniapp
    node: '',    //node
    my: ''       //阿里小程序
}
const plugins = env ? [
    new HtmlWebackPlugin({ template: './src/index.html' })] :
    [new CleanWebpackPlugin(), new HtmlWebpackPlugin({ template: './src/index.html' }),];
module.exports = {
    devtool,
    mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
    devServer: {  // npm install webpack-dev-server -D 在package.json中配置 webpack-dev-server
        contentBase: path.resolve(__dirname, 'test'),
        open: true
    },
    externals: ['lodash'], // 打包中忽略这个库
    entry,
    output,
    plugins,
    // optimization: {
    //     minimizer: [new UglifyJsPlugin({
    //         exclude: /node_modules/,
    // cache:true,
    // parallel:true,
    // sourceMap:true
    //     })],
    //   },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        "presets": [['@babel/preset-env', {
                            "useBuiltIns": "usage",//只转化使用的api
                            "corejs": 2 //@babel/pollyfill 封装高版本的api
                        }]],
                        plugins: [require('@babel/plugin-proposal-class-properties')]

                    }
                }
            }
        ]
    },
}