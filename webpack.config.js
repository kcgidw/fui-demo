const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env) => {
	const config = {
		entry: {
			index: path.resolve(__dirname, 'public', 'js', 'index.js'),
		},
		output: {
			publicPath: path.resolve('/'),
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].bundle.min.js',
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'style.bundle.css',
			}),
			// new OptimizeCssAssetsPlugin({
			// 	assetNameRegExp: /.*\.css$/g,
			// 	cssProcessor: require('cssnano'),
			// 	cssProcessorPluginOptions: {
			// 	  preset: ['default', { discardComments: { removeAll: true } }],
			// 	},
			// 	canPrint: true
			// }),
		],
		module: {
			rules: [
				{
					test: [/\.js$/, /\.jsx$/],
					exclude: /node_modules/,
					use: [
						{
							loader: 'source-map-loader',
						},
						{
							loader: 'babel-loader',
							options: {
								presets: [['@babel/preset-env']],
							},
						},
					],
				},
				{
					test: /\.html$/,
					loader: [
						{ loader: 'file-loader', options: { name: '[name].html' } },
						'extract-loader',
						'html-loader',
					],
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				},
				{
					test: /\.(png|jpg|gif)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 8192,
							},
						},
					],
				},
			],
		},
		resolve: {},
	};

	if (env.production) {
		Object.assign(config, {
			mode: 'production',
			optimization: {
				minimize: true,
				minimizer: [new TerserWebpackPlugin({ sourceMap: false })],
			},
		});
	} else if (env.development) {
		Object.assign(config, {
			mode: 'development',
			devtool: 'source-map',
			devServer: {
				// location of bundled files relative to localhost
				publicPath: '/',
				// location of static content. Using this to force reloads for 'public'
				contentBase: path.join(__dirname, 'public'),
				watchContentBase: true,
				compress: true,
				hot: true,
				index: 'index.html',
			},
		});
	} else {
		throw new Error('Bad webpack env');
	}

	return config;
};
