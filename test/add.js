var Cycni = require('../dist/cycni');
var collection = require('./collection');

Cycni.add(collection, ['batters', 0], 'new', function (error, result) {
	if (error) {
		throw error;
	} else {
		console.log('\n');
		console.log(collection);
		console.log('\n');
		console.log(result);
	}
});
