const Cycni = require('../index');
const data = require('./data');

(async function() {

	console.log(`\ndata: ${JSON.stringify(data, null, '  ')}\n`);

	const result = await Cycni.find({
		data: data,
		value: '1',
		keys: ['batters', '*', 'id']
	});

	console.log(`\nresult: ${JSON.stringify(result, null, '  ')}\n`);

}()).catch(function (error) {
	console.error(error);
});
