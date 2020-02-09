const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	const config = {
		entry: {
			index: path.resolve(__dirname, 'public', 'js', 'index.js'),
		},
		output: {
			publicPath: path.resolve(__dirname, 'public'),
			path: path.resolve(__dirname, 'public'),
			filename: '[name].bundle.min.js',
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'style.bundle.css',
			}),
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
					test: /\.(sa|sc|c)ss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								// publicPath: path.resolve(__dirname, 'public'),
							},
						},
						// 'style-loader',
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
				// {
				// 	test: /\.html$/,
				// 	loader: 'html-loader',
				// },
			],
		},
		resolve: {},
		devtool: 'source-map',
		devServer: {
			contentBase: path.resolve(__dirname, 'public'),
			compress: true,
			hot: true,
			index: 'index.html',
		},
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
		});
	} else {
		throw new Error('Bad webpack env');
	}

	return config;
};
