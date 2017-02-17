const Cycni = require('../dist/cycni');
var collection = require('./collection');

var options = {
	base: 1,
	collection: collection,
	query: {
		value: 'Regular',
		path: 'batters.batter.0.type'
	}
};

var result = Cycni.remove(options);

console.log('\n');
// console.log(collection);
console.log(collection.batters);
console.log('\n');
console.log(result);
