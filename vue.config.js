const webpack = require('webpack');

module.exports = {
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