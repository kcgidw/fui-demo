const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
	const config = {
		entry: {
			index: path.resolve(__dirname, 'public', 'js', 'index.js'),
		},
		output: {
			path: path.resolve(__dirname, 'public', 'js'),
			filename: '[name].bundle.min.js',
		},
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
					use: ['style-loader', 'css-loader', 'sass-loader'],
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
		resolve: {
			extensions: ['.js', '.jsx'],
			alias: {
				assets: path.resolve(__dirname, 'assets'),
			},
		},
	};

	if (env.production) {
		Object.assign(config, {
			mode: 'production',
			optimization: {
				minimize: true,
				minimizer: [new TerserPlugin({ sourceMap: false })],
			},
		});
	} else if (env.development) {
		Object.assign(config, {
			mode: 'development',
			devtool: 'source-map',
			devServer: {
				contentBase: path.join(__dirname, 'public'),
				compress: true,
				publicPath: '/js/',
				hot: true,
			},
		});
	} else {
		throw new Error('Bad webpack env');
	}

	return config;
};
