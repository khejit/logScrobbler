const webpack = require('webpack');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/logScrobbler/'
        : '/',
    runtimeCompiler: true,
    configureWebpack: {
        output: {
            libraryExport: 'default'
        },
        plugins: [ 
            new webpack.DefinePlugin({ "global.GENTLY_HIJACK": false }) 
        ],
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
            }
        }
    },

}