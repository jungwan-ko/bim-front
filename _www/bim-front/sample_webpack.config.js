var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
   // router:'./src/prjMng/root-router.js'
   //router:'./src/bim/bim-router.js'
   //admin:'./src/web-base/admin-controller.js',
   //login:'./src/web-base/login-controller.js'
   admin:'./src/bim-front/admin-controller.js',
  // login:'./src/bim-front/login-controller.js'
  },
  output: {
       //filename: [name].js
       filename: '[name]-controller.min.js',
       //__dirname 현재 경로, dist 폴더 이름
       //path: path.join(__dirname, './www/base/js/components/'), //경로
       path: path.join(__dirname, './www/bim-front/js/components/'), //경로
       //path:path.resolve('D://project/egov/eGovFrameDev-3.10.0-64bit/workspace/web.base/src/main/webapp/contents/base/js/')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
          
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
