const Cycni = require('../index');
const data = require('./data');

(async function() {

	const opt = {
		data: data,
		keys: ['.'],
		value: { name: 'new' }
	};

	let res;
	res = await Cycni.push(opt);
	res = await Cycni.push(opt);

	console.log('\n');
	console.log(data);
	console.log('\n');
	console.log(res);

}()).catch(function (error) {
	console.error(error);
});
