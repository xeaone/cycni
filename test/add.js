'use strict';

const Cycni = require('../dist/cycni');
const data = require('./data');

(async function() {
	let res;

	const opt = {
		data: data,
		value: { name: 'new' },
		keys: ['batters', 0]
	};

	try {
		res = await Cycni.add(opt);
	} catch (e) {
		console.error(e);
	}

	console.log('\n');
	console.log(data);
	console.log('\n');
	console.log(res);

}());
