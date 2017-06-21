var Cycni = require('../dist/cycni');
var collection = require('./collection');

Cycni.set(collection, ['array', 0], 'blue', function (error, result) {
	if (error) {
		throw error;
	} else {
		console.log('\n');
		console.log(collection);
		console.log('\n');
		console.log(result);
	}
});
