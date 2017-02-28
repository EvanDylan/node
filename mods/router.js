'use strict'

var queryString = require('querystring'),
    fs = require('fs'),
    dns = require('dns');

// 简单的请求转发路由
exports.router = function (request, response, path) {
    switch (path) {
        case '/parse':
            parseDns(request, response);
            break;
        default:
            goHome(request, response);
    }
};

// 解析域名
function parseDns(request, response) {
    response.writeHeader(200, {'Content-Type': 'text/plain'});
    var postData = '';
    request.addListener('data', function (dataChunk) {
        postData += dataChunk;
    });
    request.addListener('end', function () {
        var jsonDns = queryString.parse(postData);
        dns.resolve4(jsonDns.dnsName, function (error, address) {
            console.log(address);
            response.end(address.join(','));
        });
    });
};

// 跳转到主页
function goHome(requset, response) {
    response.writeHeader(200, {'Content-Type': 'text/html'});
    var data = fs.readFileSync('./pages/dnsresolve.html');
    response.end(data);
};

/**
 *
 * exports 和 module.exports 区别：
 *  1.module.exports 初始值为一个空对象 {}
 *  2.exports 是指向的 module.exports 的引用
 *  3.require() 返回的是 module.exports 而不是 exports
 *
 *  如果 module.exports 指向新的对象时，exports 断开了与 module.exports 的引用，
 *  那么通过 exports = module.exports 让 exports 重新指向 module.exports 即可
 */

/*
    exmples read file
 */
/*
 异步读取文件，读取完成后通过回调通知的方式来完成文件的读取处理，不会阻塞主线程。
 */
fs.readFile('./app.js', 'utf-8', function(error, data){
    console.log(data);
});

/*
 同步读取文件，通过阻塞主线程的方式等待读取结果。
 */
var data = fs.readFileSync('./app.js', 'utf-8');
console.log(data);