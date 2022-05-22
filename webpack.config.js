import * as path from 'path';
import * as webpack from 'webpack';
import {fileURLToPath} from 'url';
import {URL} from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {isDevServer} from './webpack/env.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    //entry: new URL('./src/index.tsx', import.meta.url).pathname,
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
              }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js','.jsx'],
      },
    plugins:[
        new HtmlWebpackPlugin({
            //template: new URL('./src/index.html', import.meta.url).pathname,
            template:path.join(__dirname,'/src/index.html')
        }),
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