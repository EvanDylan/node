/*
 Prior to the introduction of TypedArray in ECMAScript 2015 (ES6),
 the JavaScript language had no mechanism for reading or manipulating streams of binary data.
 The Buffer class was introduced as part of the Node.js API to make it possible to interact with
 octet streams in the context of things like TCP streams and file system operations

 Buffer使js操作二级制流成为了可能。
 */
'use strict';

//const Buffer = require('buffer').Buffer;
const fs = require('fs');

const buffer = fs.readFileSync('./app.js');
console.log(buffer.byteLength); // 缓冲区的字节大小

const buffer1 = Buffer.alloc(10, 1);
console.log(buffer1.byteLength);
console.log(buffer1.readInt8());

// 支持二进制的读写、大字节小字节、各种字符编码
