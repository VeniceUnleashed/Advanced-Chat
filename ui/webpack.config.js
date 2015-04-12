var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
        './app/entry'
    ],

    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/app/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.optimize.UglifyJsPlugin({ output: { comments: false } })
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    },

    module: {
        loaders: [
            { test: /\.jsx$/, loaders: ['react-hot', 'jsx'] },
            { test: /\.css/, loaders: ['style', 'css'] },
            { test: require.resolve("react"), loader: "expose?React" }
        ]
    },

    externals: {
    }
};