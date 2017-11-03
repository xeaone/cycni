'use strict';

const Cycni = require('../dist/cycni');
const data = require('./data');

(async function() {
	let res;

	let opt = {
		data: data,
		keys: ['batters', 0]
	};

	try {
		res = await Cycni.get(opt);
	} catch (e) {
		console.log(e);
	}

	console.log('\n');
	console.log(data);
	console.log('\n');
	console.log(res);

}());
