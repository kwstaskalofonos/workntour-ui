import * as path from 'path';
//import * as webpack from 'webpack';
import webpack from 'webpack';
import {fileURLToPath} from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const API_URL = {
    production:"",
    development:"http://localhost:8080"
}

export default {
    entry: path.join(__dirname,'./src/index.tsx'),
    output: {
        filename:"bundle.js",
        path:path.resolve(__dirname,"dist"),
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        "presets": [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    },
                }
            },
            {
                test:/\.(ts|tsx)$/,
                loader:"ts-loader",
                exclude:/node_modules/,
                options:{
                    transpileOnly:true
                }
            },
            {
                test:/\.(html)$/,
                use:{
                    loader:"html-loader"
                }
            },
            {
                test:/\.(css)$/,
                use:{
                    loader:"css-loader"
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
              {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
              },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js','.jsx'],
        alias:{
            '@src':path.resolve(__dirname,'src')
        }
      },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'/src/index.html')
        }),
        new webpack.DefinePlugin({
            __API_URL__:JSON.stringify(API_URL[process.env.NODE_ENV]),
            __CONTEXT__:JSON.stringify("/workntour")}),
    ],
    devServer:{
        allowedHosts:['*'],
        port:8083,
        compress:true,
        headers:{'Access-Control-Allow-Origin':'*'},
        historyApiFallback:true,
        hot:true,
        host:'127.0.0.1',
        
    }
}