var express = require('express');
var path = require('path');
var debug = require('debug');
var ejs = require('ejs');


var app = express();
var server = require('http').Server(app);

// 初始化环境配置
process.env.NODE_ENV = 'development';
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use('/', express.static(path.join(__dirname, 'dist')));

// 请求处理
app.get('/*', function(req, res) {
    res.render(path.join(__dirname, 'dist', 'index.html'));
});


// 错误处理

// 开发环境下将会打印堆栈信息
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).send({
            message: err.message,
            error: err
        });
    });
}

// 生产环境
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message,
        error: {}
    });
});


// 服务器启动
server.listen(app.get('port'), function() {
    console.log('Server runing at port:' + app.get('port'));
});
server.on('error', onError);
server.on('listening', onListening);


// 规范端口的格式，无效则返回false
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // 命名管道
        return val;
    }

    if (port >= 0) {
        // 端口号
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}



