var Cycni = require('../dist/cycni');
var collection = require('./collection');

var results = Cycni.get(collection, 'batters.0');

console.log('\n');
console.log(collection);
console.log('\n');
console.log(results);
