const Cycni = require('../index');
var collection = require('./collection');

var options = {
	base: 1,
	collection: collection,
	query: {
		value: 'Regular',
		path: 'batters.batter.0.type'
	},
	data: {
		path: 0
	}
};

Cycni.remove(options);

console.log('\n');
console.log(collection);
console.log('\n');
console.log(collection.batters.batter);
