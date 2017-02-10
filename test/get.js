const Cycni = require('../index');
var collection = require('./collection');

var options = {
	base: 1,
	collection: collection,
	query: {
		value: '0',
		path: 'batters.batter.0.id'
	},
	data: {
		path: 0
	}
};

var result = Cycni.get(options);

console.log('\n');
console.log(collection);
console.log('\n');
console.log(result);
