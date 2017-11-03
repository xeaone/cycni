'use strict';

const Cycni = require('../dist/cycni');
const data = require('./data');

(async function() {
	let res;

	const opt = {
		keys: '.',
		data: data
	};

	try {
		res = await Cycni.size(opt);
	} catch (e) {
		console.error(e);
	}

	console.log('\n');
	console.log(data);
	console.log('\n');
	console.log(res);

}());
