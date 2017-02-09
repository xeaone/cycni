const Cycni = require('../index');

const SET = 2;
const GET = 3;
const REMOVE = 5;

var snack = {
	id: '0',
	name: 'Cake',
	batters: {
		batter: [{
			id: '0',
			type: 'Regular'
		}, {
			id: '1',
			type: 'Chocolate'
		}, {
			id: '2',
			type: 'Blueberry'
		}]
	},

	hello: ['bob']
};

// var set = {
// 	type: SET,
// 	collection: snack,
// 	query: {
// 		value: '0',
// 		path: 'id'
// 	},
// 	data: {
// 		value: 'new',
// 		path: 'foo.bar.0'
// 	}
// };

// var get = {
// 	type: GET,
// 	base: 1,
// 	collection: snack,
// 	query: {
// 		value: '0',
// 		path: 'batters.batter.0.id'
// 	},
// 	data: {
// 		path: 0
// 	}
// };

var remove = {
	type: REMOVE,
	base: 1,
	collection: snack,
	query: {
		value: 'Regular',
		path: 'batters.batter.0.type'
	},
	data: {
		path: 0
	}
};

var result = Cycni(remove);

console.log('\n');
console.log(snack);
console.log('\n');
console.log(snack.batters.batter);
if (result) console.log(result);
