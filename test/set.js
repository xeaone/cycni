'use strict';

const Cycni = require('../dist/cycni');
const data = require('./data');

(async function() {
	let res;

	const opt = {
		data: data,
		keys: ['array', 0],
		value: { name: 'new' }
	};

	try {
		res = await Cycni.set(opt);
	} catch (e) {
		console.error(e);
	}

	console.log('\n');
	console.log(data);
	console.log('\n');
	console.log(res);

}());
