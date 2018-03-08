const Cycni = require('../index');
const data = require('./data');

(async function() {

	const result = await Cycni.size({
		keys: '.',
		data: data
	});

	console.log(`\ndata: ${JSON.stringify(data, null, '  ')}\n`);
	console.log(`\nresult: ${JSON.stringify(result, null, '  ')}\n`);

}()).catch(function (error) {
	console.error(error);
});
