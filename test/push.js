const Cycni = require('../index');
const data = require('./data');

(async function() {

	console.log(`\ndata: ${JSON.stringify(data, null, '  ')}\n`);
	
	let opt = {
		data: data,
		keys: ['.'],
		value: { name: 'new' }
	};

	let result;

	result = await Cycni.push(opt);
	result = await Cycni.push(opt);

	console.log(`\nresult: ${JSON.stringify(result, null, '  ')}\n`);

}()).catch(function (error) {
	console.error(error);
});
