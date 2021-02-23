const path = require('path')
const HtmlWebackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const env = process.env.NODE_ENV==='dev';
const targetPath = env?path.resolve(__dirname,'demo') :path.resolve(__dirname,'dist');
const output = {
        filename: "[name].js",
        path: targetPath,
        library: 'mole',
        libraryTarget: 'umd',
        // libraryExport: 'default', 
        // library: 'mole',
        // libraryTarget: 'umd'
        // path: __dirname + '/dist/',
        sourceMapFilename: '[name].map',
        // library: 'axios',
        // libraryTarget: 'umd'
    }
const entry = {
        mole: './src/mole.js'  // 用于浏览器端
}
const devtool = env ? false:'inline-source-map';
const mode = env ?'development':'production';
const extend = {
    wx:'',      // 微信小程序
    taro:'',    //taro
    uniapp:'',  //uniapp
    node:'',    //node
    my:''       //阿里小程序
}
const plugins =env ? [new HtmlWebackPlugin({ template: './src/index.html' })]:[new CleanWebpackPlugin(['dist']),new HtmlWebackPlugin({ template: './src/index.html' })];
module.exports = {
    devtool,
    mode: process.env.NODE_ENV==='dev'?'development':'production',
    devServer:{  // npm install webpack-dev-server -D 在package.json中配置 webpack-dev-server
        contentBase:path.resolve(__dirname,'demo'), 
        open:true
    },
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
        rules: [{
            test: /\.(jpg|jpeg|png|gif)$/,
            use: {

                loader: 'url-loader',
                // options:'[name].[ext]',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'static/img/',
                    limit: 2048
                },
            }
        },
        {
            test: /\.(eot|ttf|svg)$/,
            use: {
                loader: 'file-loader'
            }
        },
        // {
        //     test: /\.(sc|c|sa)ss$/,
        //     // npm install css-loader 處理@import node-scss sass-loader postcss-loader autoprefixer -D
        //     use: ['style-loader',
        //         {
        //             loader: 'css-loader',
        //             options: {
            // sourceMap:true,
        //                 importLoaders: 2
        //             },
        //             module: true //開啟模块化打包  css使用的时候 必须使用 import cc from 'cc.scss'
        //         },
        //         'sass-loader',
        // {'loader':'postcss-loader',
        // options:{
            // ident:'postcss',
        //     sourceMap:true,
        //     plugins:loader=>[
        //       require('autoprefixer')
        //     ]
        // }}
        //         'postcss-loader']
        // },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                "presets": [['@babel/preset-env',{
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