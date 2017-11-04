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

// Cycni.traverseKeys = async function (data, method) {
// 	return await Promise.all(data.map(method));
// };

Cycni.map = async function (data, callback) {
	return await Promise.all(data.map(callback));
};

Cycni.return = async function (data, handler) {
	if (data.constructor === Array) {
		if (handler.constructor === Function) {
			return data.map(handler);
		} else {
			return await Promise.all(data.map(handler));
		}
	} else {
		return await handler(data);
	}
};



Cycni.star = async function (opt) {
	return await Promise.all(Object.keys(opt.data).map(async function (key) {

		let keys = opt.keys.slice(opt.index);

		keys[0] = key;

		return await Cycni.traverse({
			keys: keys,
			data: opt.data,
			value: opt.value,
			ks: opt.ks.slice(0, opt.index).concat(keys)
		});

	}));
};

Cycni.traverse = async function (opt) {

	let data = opt.data;
	let keys = opt.ks || opt.keys;
	let last = opt.keys.length === 0 ? 0 : opt.keys.length - 1;

	for (let i = 0; i < last; i++) {
		let key = opt.keys[i];

		if (!(key in data)) {

			if (key === '*') {
				return await Cycni.star({
					index: i,
					ks: keys,
					data: data,
					keys: opt.keys,
					value: opt.value
				});
			}

			if (key === '.') {
				return {
					key: key,
					keys: keys,
					data: data
				}
			}

			if (opt.create === true) {
				if (isNaN(opt.keys[i+1])) {
					data[key] = {};
				} else {
					data[key] = [];
				}
			} else if (opt.create === false) {
				break;
			} else {
				throw new Error('Cycni.traverse - property ' + key + ' is undefined');
			}
		}

		data = data[key];
	}

	return {
		data: data,
		keys: keys,
		key: opt.keys[last]
	};
};

Cycni.set = async function (opt) {
	opt.create = true;

	let results = await Cycni.traverse(opt);

	Cycni.return(results, function (result) {
		if (result.data.constructor === Object) {
			result.data[result.key] = opt.value;
		} else if (result.data.constructor === Array) {
			result.data.splice(result.key, 1, opt.value);
		}
	});
};

Cycni.add = async function (opt) {
	opt.create = undefined;

	let results = await Cycni.traverse(opt);

	Cycni.return(results, function (result) {
		if (result.data.constructor === Object) {
			if (result.key in result.data) {
				throw new Error('Cycni.add - property ' + result.key + ' exists');
			} else {
				result.data[result.key] = opt.value;
			}
		} else if (result.data.constructor === Array) {
			result.data.splice(result.key, 0, opt.value);
		}
	});
};

Cycni.push = async function (opt) {
	opt.create = true;

	let results = await Cycni.traverse(opt);

	return Cycni.return(results, function (result) {
		let data = result.key === '.' ? result.data : result.data[result.key];

		if (data.constructor === Object) {
			const length = Object.keys(data).length;

			let index = length;
			let key = '_' + index;

			while (key in data) {
				key = '_' + index++;
			}

			data[key] = opt.value;

			return length+1;
		} else if (data.constructor === Array) {
			return data.push(opt.value);
		}

	});
};

Cycni.remove = async function (opt) {
	opt.create = false;

	let results = await Cycni.traverse(opt);

	return Cycni.return(results, async function (result) {
		let value;

		if (result.data.constructor === Object) {
			value = result.data[result.key];
			delete result.data[result.key];
		} else if (result.data.constructor === Array) {
			value = result.data.splice(result.key, 1);
		}

		return value;
	});
};

Cycni.find = async function (opt) {
	opt.create = undefined;

	let results = await Cycni.traverse(opt);

	if (results.constructor === Object) {
		return result.data[result.key] === opt.value;
	}

	return results.filter(function (result) {
		return result.data[result.key] === opt.value;
	});
};

Cycni.get = async function (opt) {
	opt.create = false;

	let results = await Cycni.traverse(opt);

	return await Cycni.return(results, async function (result) {
		return result.data[result.key];
	});
};

Cycni.has = async function (opt) {
	opt.create = false;

	let results = await Cycni.traverse(opt);

	return await Cycni.return(results, async function (result) {
		return result.key in result.data;
	});
};

Cycni.size = async function (opt) {
	opt.create = false;

	let results = await Cycni.traverse(opt);

	return await Cycni.return(results, async function (result) {
		let data = result.key === '.' ? result.data : result.data[result.key];
		if (data.constructor === Object) {
			return Object.keys(data).length;
		} else if (data.constructor === Array) {
			return data.length;
		}
		return 0;
	});
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
