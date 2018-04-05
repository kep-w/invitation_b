//webpack配置文件
var webpack = require('webpack');
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var currentTarget = process.env.npm_lifecycle_event||"dev";
var ROOT_PATH = path.resolve(__dirname);//当前目录名
var APP_PATH = path.resolve(ROOT_PATH, 'src');//源代码目录
var BUILD_PATH = path.resolve(ROOT_PATH, 'app');//编译之后的目录

var debug,
minimize;
if(currentTarget=="build"){
	debug = false,minimize = true;
}else{
	debug = true,minimize = false;
}
var pluginsList=[
	//打包后的注释
    new webpack.BannerPlugin('This file is created by webpack'),
    new webpack.ProvidePlugin({//加载jquery
        $:'jquery',//jquery模块
        jQuery:'jquery',//jquery
        // Swiper:APP_PATH+"/js/swiper.jquery.min.js"//swiper jquery
    }),
    new ExtractTextPlugin("css/[name]_styles_[contenthash:8].css"),
    new HtmlWebpackPlugin({
    	filename:"index.html",
    	template:APP_PATH+"/index.html"
    }),
    new CleanWebpackPlugin([BUILD_PATH])
]
module.exports = {
	devtool : "sourcemap",

	entry : {

		"index":[APP_PATH+"/js/main.js"],//首页样式
	},
    output : {
        path : BUILD_PATH,
        filename:'js/[name]_[chunkhash:8].js'//动态文件名
    },
	module : {
		rules : [
			//样式加载器
            {
                test:/\.css$/,
                loader:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    // use: ["css-loader","postcss-loader"]
                    use:[{ loader: 'css-loader', options: { importLoaders: 1 } },'postcss-loader']
                })
            },
            {
                test:/\.mp3/,
                loader:"file-loader",
                query:{
                    name:'music/[name].[ext]'
                }
            },
            //图片路径加载器
            {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test:/\.(jpg|png|woff|eot|ttf|svg|gif)$/,
                loader:"url-loader?limit=1&name=/img/[name].[ext]"
            },
            {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test:/\.(html)$/,
                loader:"html-loader"
            }
		]
	},
	plugins:pluginsList
}

