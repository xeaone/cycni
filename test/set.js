var Cycni = require('../dist/cycni');
var collection = require('./collection');

var options = {
	collection: collection,
	query: {
		value: '0',
		path: 'id'
	},
	data: {
		value: 'new',
		path: 'foo.bar.0'
	}
};

Cycni.set(options);

console.log('\n');
console.log(collection);
