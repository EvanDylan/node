/*
    异步I/O
        异步、同步是针对用户态的应用层的操作。如果操作必须等待不能继续往下执行那么就是同步的，
    如果可以继续往下执行通过回调的方式来通知结果那么就是异步的。（观察者模式、事件的Loop、共享的对象、异步执行的线程池。）
        阻塞、非阻塞是针对内核态的CPU的执行。如果操作必须让cpu等待下去不释放cpu执行资源就是阻塞的，
    如果操作阻塞时让出cpu的执行资源给其他线程就是非阻塞的。

    在Node中除了JavaScript是单线程的，其他的I/O都是多线程的。（磁盘、网络）。
 */

/*
 *  Node中非I/O的异步API
 *  1.setTimeout()
 *  2.setInterval()
 *  3.process.nextTick()
 *  4.setImmediate()
 */

'use strict';

/*
 * @param {Function} callback
 * @param {number} delay 毫秒单位
 * @param {...*} args
 * setInterval是重复的执行的、setTimeout只执行一次
 * 缺点：定时并非准确，效率也不是最高的。
 */
// setTimeout(function () {
//     console.log('setTimeout()');
// }, 3000);
//
// var interval = setInterval(function () {
//     console.log('setInterval()');
// }, 3000);

/**
 *  1.nextTick优先级 > setImmediate(具体原因是事件循环对观察者的检查顺序是有先后的，process.nextTick()属于idle观察者，
 *  setImmediate()属于check观察者。每次轮询检查中idle观察者先与I/O观察者，I/O观察者先于check观察者)
 *  2.nextTick()的回调函数会保存在一个数组中，执行时会将所有的回调函数执行完毕；setImmediate的结果保存在链表中，每次只
 *   执行一个回调函数，尽快的让出cpu资源，防止阻塞后续执行。
 *  3.process.nextTick() is non-clearable, meaning once code has been
 *   scheduled to execute with process.nextTick(), the execution cannot be stopped, just like with a normal function.
 */

// setImmediate(function () {
//     console.log('setImmediate()');
// });
//
// process.nextTick(function () {
//     console.log('nextTick()');
// });

// --------------------------------s

process.nextTick(function () {
    console.error('nextTick()1');
});
process.nextTick(function () {
    console.error('nextTick()2');
});
setImmediate(function () {
    console.error('setImmediate()1');
    process.nextTick(function () {
        console.error('强势插入');
    });
});
setImmediate(function () {
    console.error('setImmediate()2');
});