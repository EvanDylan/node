/**
 * V8内存检测工具
 */

'use strict';

const memwatch = require('memwatch-next'); // 内存泄露的排查
const http = require('http');
var heapdump = require('heapdump');

// 连续5次内存仍然没有被释放会触发leak事件
memwatch.on('leak', function (info) {
    console.log('leak:' + queryString.parse(info));
});

// 每次全堆垃圾回收时触发stats事件。
/*
 { num_full_gc: 94, // 第94次全堆垃圾回收
 num_inc_gc: 129,   // 第129次增量垃圾回收
 heap_compactions: 94, // 第94次对堆内存进行整理压缩
 usage_trend: 24.5,
 estimated_base: 114600168,
 current_base: 4764360,
 min: 4265440,
 max: 340355264 }

 */
memwatch.on('stats', function(stats) {
    console.log('stats:' + JSON.stringify(stats));
});


var useHeapMemory = function () {
    var size = 20 * 1024 * 1024;
    var array = new Array(size);
    for (var i = 0; i < size; i++) {
        array[i] = 0;
    }
    return array;
};

http.createServer(function (req, res) {
    useHeapMemory();
    res.writeHead('200', 'text/plain');
    res.end('Hello memwatch');
}).listen(8080);

/**
 * {
  "before": {
    "nodes": 28147,
    "size_bytes": 3722056,
    "size": "3.55 mb"
  },
  "after": {
    "nodes": 25722,
    "size_bytes": 3278320,
    "size": "3.13 mb"
  },
  "change": {
    "size_bytes": -443736,
    "size": "-433.34 kb",
    "freed_nodes": 2474,
    "allocated_nodes": 1,
    "details": [
      {
        "what": "Array",
        "size_bytes": -84768,
        "size": "-82.78 kb",
        "+": 0,
        "-": 1118
      },
      {
        "what": "Code",
        "size_bytes": -330240,
        "size": "-322.5 kb",
        "+": 0,
        "-": 386
      },
      {
        "what": "String",
        "size_bytes": -7120,
        "size": "-6.95 kb",
        "+": 0,
        "-": 140
      }
    ]
  }
}
 */
// 生成内存快照 before after change(内存产生的变化，+代表内存增加 -代表内存减少)
var hd = new memwatch.HeapDiff();
var diff = hd.end();
console.log(JSON.stringify(diff, null, 2));

setInterval(function () {
    console.log(process.memoryUsage());
}, 5000)

/*
 生成内存dump文件
 var heapdump = require('heapdump');
 The module exports a single writeSnapshot([filename], [callback]) function that writes out a snapshot.
 filename defaults to heapdump-<sec>.<usec>.heapsnapshot when omitted.

 heapdump.writeSnapshot('/var/local/' + Date.now() + '.heapsnapshot');
 The function also takes an optional callback function which is called upon completion of the heap dump.

 heapdump.writeSnapshot(function(err, filename) {
 console.log('dump written to', filename);

 On UNIX platforms, you can force a snapshot by sending the node.js process a SIGUSR2 signal:
 $ kill -USR2 <pid> 强制输出dump文件

 借助chrome Profiles工具观察内存详情
 });
 */
heapdump.writeSnapshot(__dirname + '/' + Date.now() + '.heapsnapshot', function (error, filename) {
    console.log('dump written to', filename);
});

