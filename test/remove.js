const Cycni = require('../index');
const data = require('./data');

(async function() {

	console.log(`\ndata: ${JSON.stringify(data, null, '  ')}\n`);

	// const gots = await Cycni.get({
	// 	data: data,
	// 	keys: ['batters', '0']
	// });

	// const result = await Cycni.remove({
	// 	data: data,
	// 	// value: gots[0].data,
	// 	keys: ['batters', '*']
	// });

	const result = await Cycni.remove({
		data: data,
		value: '1',
		keys: ['batters', '*', 'id']
	});

	console.log(`\nresult: ${JSON.stringify(result, null, '  ')}\n`);
	console.log(`\ndata: ${JSON.stringify(data, null, '  ')}\n`);

}()).catch(function (error) {
	console.error(error);
});
