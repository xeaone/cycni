var Cycni = require('../dist/cycni');
var collection = require('./collection');

var results = Cycni.set(collection, 'arr.0.obj', {});

console.log('\n');
console.log(collection);
console.log('\n');
console.log(results);
