const Cycni = require('../index');
const data = require('./data');

(async function() {

	console.log(`\ndata: ${JSON.stringify(data, null, '  ')}\n`);
	
	const result = await Cycni.set({
		data: data,
		// keys: ['array', 0],
		// value: { name: 'new' }
		value: { name: 'bar' },
		keys: ['batters', '*', 'foo']
	});

	console.log(`\nresult: ${JSON.stringify(result, null, '  ')}\n`);

}()).catch(function (error) {
	console.error(error);
});
