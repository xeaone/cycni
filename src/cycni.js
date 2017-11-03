/*
	@banner
	title: cycni
	version: 2.1.0
	license: mpl-2.0
	author: alexander elias

	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

// import Uuid from './uuid.js';

const Cycni = {};

Cycni.uuid = async function () {
	return await Uuid();
};

Cycni.traverse = async function (opt) {

	if (!opt.keys && opt.keys.length === 1 && opt.keys[0] === '.') {
		return {
			key: '.',
			data: res.data
		}
	}

	var data = opt.data;
	var keys = opt.keys;
	var create = opt.create;
	var length = keys.length;
	var last = length === 0 ? 0 : length - 1;

	for (var i = 0; i < last; i++) {
		var key = keys[i];

		if (!(key in data)) {
			if (create === true) {
				if (isNaN(keys[i+1])) {
					data[key] = {};
				} else {
					data[key] = [];
				}
			} else if (create === false) {
				break;
			} else {
				throw new Error('Cycni.traverse - property ' + key + ' is undefined');
			}
		}

		data = data[key];
	}

	return {
		key: keys[last],
		data: data
	};
};

Cycni.get = async function (opt) {
	opt.create = false;
	const res = await Cycni.traverse(opt);
	return res.data[res.key];
};

Cycni.set = async function (opt) {
	opt.create = true;
	const res = await Cycni.traverse(opt);
	if (res.data.constructor === Object) {
		res.data[res.key] = opt.value;
	} else if (res.data.constructor === Array) {
		res.data.splice(res.key, 1, opt.value);
	}
};

Cycni.add = async function (opt) {
	opt.create = undefined;

	const res = await Cycni.traverse(opt);

	if (res.data.constructor === Object) {
		if (res.key in res.data) {
			throw new Error('Cycni.add - property ' + res.key + ' exists');
		} else {
			res.data[res.key] = opt.value;
		}
	} else if (res.data.constructor === Array) {
		res.data.splice(res.key, 0, opt.value);
	}
};

Cycni.push = async function (opt) {
	opt.create = true;
	const res = await Cycni.traverse(opt);
	const data = res.key === '.' ? res.data : res.data[res.key];

	if (data.constructor === Object) {
		const length = Object.keys(data).length;
		let index = length;
		let key = '_' + index;

		while (key in data) {
			key = '_' + index++;
		}

		data[key] = opt.value;

		return length+1;
	}else if (data.constructor === Array) {
		return data.push(opt.value);
	}

	return 0;
};

Cycni.has = async function (opt) {
	opt.create = false;
	const res = await Cycni.traverse(opt);
	return res.key in res.data;
};

Cycni.remove = async function (opt) {
	opt.create = false;
	const res = await Cycni.traverse(opt);

	let value;

	if (res.data.constructor === Object) {
		value = res.data[res.key];
		delete res.data[res.key];
	} else if (res.data.constructor === Array) {
		value = res.data.splice(res.key, 1);
	}

	return value;
};

Cycni.size = async function (opt) {
	opt.create = false;
	const res = await Cycni.traverse(opt);
	const data = res.key === '.' ? res.data : res.data[res.key];

	if (data.constructor === Object) {
		return Object.keys(data).length;
	} else if (data.constructor === Array) {
		return data.length;
	}

	return 0;
};

Cycni.clone = async function (variable) {
	var clone;

	if (variable === null || variable === undefined || typeof variable !== 'object') {

		return variable;

	} else if (variable.constructor.name === 'Array') {
		clone = [];

		for (var i = 0, l = variable.length; i < l; i++) {
			clone[i] = this.clone(variable[i]);
		}

	} else if (variable.constructor.name === 'Object') {
		clone = {};

		for (var key in variable) {

			if (variable.hasOwnProperty(key)) {
				clone[key] = this.clone(variable[key]);
			}

		}

	} else {
		throw new Error('Cycni.clone - type is not supported');
	}

	return clone;
};

export default Cycni;
