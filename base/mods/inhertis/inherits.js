/*
    Node.js中的继承
 */
'use strict'



const Person = require('./person');
const Student = require('./student');
const Override = require('./override');

var person = new Person();
var student = new Student();
var override = new Override();

person.eat();
student.eat();
student.study();
override.eat();
override.study();
