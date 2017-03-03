/**
 * class for student
 */
'use strict'

const util = require('util')
const Person = require('./person');

function Student() {
    Person.call(this);
}

// student继承自person
util.inherits(Student, Person);

Student.prototype.study = function() {
  console.log('i am learning...');
};

module.exports = Student;