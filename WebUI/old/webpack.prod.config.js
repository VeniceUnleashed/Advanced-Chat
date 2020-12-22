var webpack = require('webpack');

module.exports = {
    entry: [
        './app/Entry'
    ],

    output: {
        path: __dirname + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({ output: { comments: false } })
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    },

    module: {
        loaders: [
            { test: /\.jsx$/, loaders: ['jsx'] },
            { test: /\.css/, loaders: ['css'] },
            { test: require.resolve('react'), loader: 'expose?React' }
        ]
    },

    externals: {
    }
};