const Cycni = require('../index');
const data = require('./data');

(async function() {

	const opt = {
		data: data,
		value: '1',
		keys: ['batters', '*', 'id']
	};

	let res = await Cycni.remove(opt);

	console.log('\n');
	console.log(data);
	console.log('\n');
	console.log(res);

}()).catch(function (error) {
	console.error(error);
});
