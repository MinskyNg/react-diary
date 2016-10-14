if (process.env.NODE_ENV === 'production') {
    // 生产环境配置
    module.exports = require('./store.prod');
} else {
    // 开发环境配置
    module.exports = require('./store.dev');
}
