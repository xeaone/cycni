const Cycni = require('../index');
const data = require('./data');

(async function() {
	
	console.log(`\ndata: ${JSON.stringify(data, null, '  ')}\n`);

	const result = await Cycni.size({
		keys: '.',
		data: data
	});

	console.log(`\nresult: ${JSON.stringify(result, null, '  ')}\n`);

}()).catch(function (error) {
	console.error(error);
});
