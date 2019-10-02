const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");
const glob = require("glob");
let files = glob.sync("./migrations/**/*.ts");

const isWatch = process.argv.includes('--watch');

const plugins = [
	new webpack.BannerPlugin({
		banner: 'require("source-map-support").install();',
		raw: true,
		entryOnly: false
	}),
	new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
	new webpack.DefinePlugin({
		"process.env": {BUILD_TARGET: JSON.stringify("server")}
	})
];

if (isWatch) {
	plugins.push(new StartServerPlugin("index.js"));
}

module.exports = {
	entry: [
		"webpack/hot/poll?1000",
		"./server/index.ts"
	].concat(files),
	mode: "development",
	devtool: 'source-map',
	externals: [
		nodeExternals({whitelist: ["webpack/hot/poll?1000"]})
	],
	module: {
		rules: [{
			test: /\.ts?$/,
			use: [{
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
					experimentalWatchApi: true
				}
			}],
			exclude: /node_modules/
		}]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: plugins,
	target: "node",
	node: {
		__dirname: true,
		__filename: true
	},
	output: {
		path: path.join(__dirname, "build"), filename: "index.js"
	}
};