const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        resourceQuery: /raw/,  // 只匹配 ?raw 查询
        use: 'raw-loader',  // 使用 raw-loader 来导入文件的内容
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    // 静态文件夹目录
    static: './public',
    // 浏览端口
    port: 3000,
    // 在浏览器中打开
    open: true,
    // 启用热部署
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // 这个插件会在开发模式下启用 React Fast Refresh
    // 使得 React 组件在热更新时能够保持状态
    // 注意：在生产模式下不需要这个插件，生产模式下会自动禁用
    new ReactRefreshWebpackPlugin({
      // 不在界面上显示报错
      overlay: false
    })
  ],
};
