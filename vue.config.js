const TransformPages = require('uni-read-pages')
const {
	webpack
} = new TransformPages()
const path = require("path");

function resolve(dir) {
	return path.join(__dirname, dir);
}


module.exports = {
	lintOnSave: process.env.NODE_ENV === "development",
	// 路径别名
	configureWebpack: {
		resolve: {
			alias: {
				"@": resolve(""),
			},
		},
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath']
					});
					return JSON.stringify(tfPages.routes)
				}, true)
			})
		]
	},
};
