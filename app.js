var http = require('http'), // http服务器
    dns  = require('dns'), // 域名解析
    fs   = require('fs'),   // 文件操作
    url  = require('url'),  // URL处理
    queryString = require('querystring'), // 字符串处理
    router = require('./mods/router'); // 自定义简单路由

/*
    create http server, and listing on 8080.
 */
http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname; // 解析url请求路径
    router.router(request, response, path); // 请求路由
}).listen('8080', '127.0.0.1');

dns.resolve4('www.baidu.com', function(error,address){
    console.log(address);
});