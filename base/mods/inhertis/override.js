/**
 * 重写student的eat方法
 */

'use strict'

const util = require('util');
const student = require('./student');

function Override() {
    student.call(this);
    this.study = function () {
        console.log('我竟然重载了student的study方法');
    };
};

util.inherits(Override, student); // Override继承student的方法。

module.exports = Override;