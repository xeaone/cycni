'use strict';

const Cycni = require('../dist/cycni');
const data = require('./data');

(async function() {
	let res;

	const opt = {
		data: data,
		keys: ['batters', 0]
	};

	try {
		res = await Cycni.remove(opt);
	} catch (e) {
		console.error(e);
	}

	console.log('\n');
	console.log(data);
	console.log('\n');
	console.log(res);

}());
