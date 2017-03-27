var Cycni = require('../dist/cycni');
var collection = require('./collection');

var results = Cycni.interact(collection, [
	{
		// base: true,
		path: 'batters',
		// action: function (collection, path) {
			// return path;
		// }
	},
	{
		condition: function (collection, key) {
			return key === 2 ? Cycni.BREAK : undefined;
		},
		action: function (collection, key) {
			return Cycni.set(collection, key, {});
		}
	},
	// {
	// 	condition: function (collection, key) {
	// 		return key === 0 ? Cycni.CONTINUE : undefined;
	// 	},
	// 	action: function (collection, key) {
	// 		console.log(collection);
	// 		console.log(key);
	// 		return Cycni.remove(collection, key);
	// 	}
	// }
]);

console.log('\n');
console.log(collection);
console.log('\n');
console.log(results);
