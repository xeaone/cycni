const Cycni = require('../index');
const data = require('./data');

(async function() {

	const result = await Cycni.remove({
		data: data,
		value: '1',
		keys: ['batters', '*', 'id']
	});

	console.log(`\ndata: ${JSON.stringify(data, null, '  ')}\n`);
	console.log(`\nresult: ${JSON.stringify(result, null, '  ')}\n`);

}()).catch(function (error) {
	console.error(error);
});
