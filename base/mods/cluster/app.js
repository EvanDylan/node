/*
 A single instance of Node.js runs in a single thread.
 To take advantage of multi-core systems the user will sometimes
 want to launch a cluster of Node.js processes to handle the load.
    给与运行在单线程上的Node.js发挥多核优势的机会。
    Mater进程上挂载cluster
 */

'use strict'

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}