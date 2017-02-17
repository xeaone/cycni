const Cycni = require('../dist/cycni');
var collection = require('./collection');

var options = {
	base: 1,
	collection: collection,
	query: {
		value: '0',
		path: 'batters.batter.0.id'
	}
};

var result = Cycni.get(options);

console.log('\n');
console.log(collection);
console.log('\n');
console.log(result);
