const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/../backend/public"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".svg"],
        alias: {
            config: path.join(__dirname, 'src/config/dev.ts'),
        }
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.(ts|tsx)?$/, loaders: ['awesome-typescript-loader'] },

            {
                test: /\.scss$/,
                loaders: [ 'style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap' ]
            },

            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: "url-loader"
            },

            {
                test: /\.svg$/,
                loader: "svg-sprite-loader",
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {

    },
    plugins: [
        new SpriteLoaderPlugin(),
        new CopyWebpackPlugin([
            { from: "index.html" },
        ])
    ],
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        historyApiFallback: true,
        hot: true,
        port: 8080,
        host: '0.0.0.0',
        proxy: {
            "/api": "http://localhost:3000/"
        }
    }
};