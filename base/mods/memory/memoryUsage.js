/*
 V8引擎默认内存大小（32平台下0.7GB，64位平台下1.5GB），不支持运行时动态扩展。
 可以通过启动时加参数来修改默认内存大小。
 1.--max-old-space-size=1000 // 单位MB
 2.--max-new-space-size=1000 // 单位KB
 */

'use strict';


// 查看内存使用情况。
var showMemory = function () {
    var memory = process.memoryUsage();
    var format = function (bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + 'MB';
    };
    console.log('Process:' + 'rss ' + format(memory.rss) // rss (resident set size 进程常驻内存不包含对外内存)
        + ' heapTotal ' + format(memory.heapTotal)
        + ' heapUsed ' + format(memory.heapUsed)
        + ' external ' + format(memory.external)); // 堆外内存
    console.log('-------------------------------------');
};

// 使用堆内内存。
var useHeapMemory = function () {
    var size = 20 * 1024 * 1024;
    var array = new Array(size);
    for (var i = 0; i < size; i++) {
        array[i] = 0;
    }
    return array;
};

// 堆外内存，通过Node底层的libu直接操作系统内存
var useDirectMemory = function () {
    var size = 20 * 1024 * 1024;
    var buffer = Buffer.alloc(size);
    return buffer;
};

var total = [];

for (var i = 0; i < 40; i++) {
    total.push(useHeapMemory());
    total.push(useDirectMemory());
    showMemory();
}