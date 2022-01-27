module.exports = {
  // 打包的前缀路径
  publicPath : '',

  chainWebpack: config => {
    config.module
      .rule('scss')
      .test(/\.scss$/)
      .oneOf('vue')
      .use('px2rem-loader')
      .loader('px2rem-loader')
      .before('postcss-loader') // this makes it work.
      .options(
        { 
          remUnit: 37.5, //1rem=多少像素 这里的设计稿是375px。
          remPrecision: 8 // px转rem的精度
        }
      )
      .end()
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },

  devServer: {
    proxy: {
      '/_api': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/_api': '/'
        }
      }
    }
  }
}
