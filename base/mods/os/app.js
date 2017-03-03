/*
    The os module provides a number of operating system-related utility methods.
    提供了工具类来访问操作系统的信息。
 */

'use strict';

const os = require('os');


console.log(os.cpus()); // 输出每个cpu的相关信息 os.cpus().length可以计算出cpu的核心数。
console.log(os.freemem()); // 剩余内存大小

/**
 * 返回最近1、5、15的平均负载[ 2.15771484375, 2.15966796875, 2.2333984375 ]，这个是unix平台下的概念所以在
 * windows下不可用，始终返回[0,0,0]。
 *
 * 2.15表示平均进程数。
 * 进程数 / cpu数量  结果值在4左右都是可以接受的范围
 */
console.log(os.loadavg());

console.log(os.platform()); // darwin 苹果mac系统...

console.log(os.totalmem()); // 总共的内存大小，byte为单位整数

