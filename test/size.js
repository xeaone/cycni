const Cycni = require('../index');
const data = require('./data');

(async function() {

	const opt = {
		keys: '.',
		data: data
	};

	let res = await Cycni.size(opt);

	console.log('\n');
	console.log(data);
	console.log('\n');
	console.log(res);

}()).catch(function (error) {
	console.error(error);
});
