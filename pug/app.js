/**
 * Pug is a high performance template engine
 */

'use strict'

const pug = require('pug');
const compiledFunction = pug.compileFile('template.pug');
var html = compiledFunction({
    name: 'Evan'
});
console.log(html);