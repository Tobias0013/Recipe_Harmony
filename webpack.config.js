const HtmlWebPackPlugin = require("html-webpack-plugin") ;

module.exports = {
  devServer: {
    historyApiFallback: true,
  },
  output: {
    publicPath: "/"
  },
  entry: "./client",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
        
      },
      {
        test: /.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
    }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./client/index.html",
      filename: "./index.html",
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }

};
