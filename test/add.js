const Cycni = require('../index');
const data = require('./data');

(async function() {

	const opt = {
		data: data,
		value: { name: 'new' },
		keys: ['batters', 0]
	};

	let res = await Cycni.add(opt);

	console.log('\n');
	console.log(data);
	console.log('\n');
	console.log(res);

}()).catch(function (error) {
	console.error(error);
});
