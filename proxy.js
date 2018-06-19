module.exports = {
    '/api': {
        target: 'http://192.168.10.110:3100',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    },
}
