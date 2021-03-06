module.exports = {
  publicPath: './',
    devServer: {
      'host': 'localhost',
      'port': 8888,
        proxy: {
            '/blog': {
                target: 'http://localhost:8080/blog',
                changeOrigin: true,
                pathRewrite: {
                    '^/blog': ''
                }
            },
            '/upload': {
                target: 'http://29175vv342.zicp.vip',
                changeOrigin: true,
                pathRewrite: {
                    '^/upload': ''
                }
            },
            '/admin': {
                target: 'http://localhost:8080/admin',
                changeOrigin: true,
                pathRewrite: {
                    '^/admin': ''
                }
            },
        }
    }
}