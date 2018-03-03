const Cycni = require('../index');
const data = require('./data');

(async function() {

	const opt = {
		data: data,
		// keys: ['array', 0],
		// value: { name: 'new' }
		value: { name: 'bar' },
		keys: ['batters', '*', 'foo']
	};

	let res = await Cycni.set(opt);

	console.log('\n');
	console.log(data);
	console.log('\n');
	console.log(res);

}()).catch(function (error) {
	console.error(error);
});
