'use strict';

module.exports = {

	each: async function (data, method, context) {
		const promises = [];

		if (!data) {
			return [];
		} else if (data.constructor === Array) {
			for (let i = 0; i < data.length; i++) {
				promises.push(method.call(this, i, data[i]));
			}
		} else if (data.constructor === Object) {
			for (let k in data) {
				promises.push(method.call(this, k, data[k]));
			}
		}

		return await Promise.all(promises);
	},

	star: async function (opt) {
		const results = [];

		await this.each(opt.data, async function (key) {
			const keys = opt.keys.slice(1);

			keys.unshift(key);

			const result = await this.traverse({
				keys: keys,
				data: opt.data,
				value: opt.value,
			});

			Array.prototype.push.apply(results, result);
		});

		return results;
	},

	traverse: async function (opt) {
		let parent;

		let data = opt.data;
		const keys = opt.keys;
		const value = opt.value;
		const create = opt.create;
		const length = opt.keys.length;

		for (let index = 0; index < length; index++) {
			let key = keys[index];

			if (!(key in data)) {

				if (key === '*') {
					return await this.star({
						data: data,
						value: value,
						keys: keys.slice(index)
					});
				}

				if (key === '.') {
					return [{
						key: key,
						data: data
					}];
				}

				if (create === true) {

					if (isNaN(keys[index+1])) {
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

			parent = data;
			data = data[key];
		}

		return [{
			data: data,
			parent: parent,
			key: keys[length-1]
		}];
	},

	set: async function (opt) {
		opt.create = true;

		const results = await this.traverse(opt);

		for (const result  of results) {
			if (!result.data) {
				continue;
			} else if (result.data.constructor === Object) {
				result.data[result.key] = opt.value;
			} else if (result.data.constructor === Array) {
				result.data.splice(result.key, 1, opt.value);
			}
		}

		return results;
	},

	add: async function (opt) {
		opt.create = undefined;

		const results = await this.traverse(opt);

		for (const result  of results) {
			if (!result.data) {
				continue;
			} else if (result.data.constructor === Object) {
				if (result.key in result.data) {
					throw new Error('Cycni.add - property ' + result.key + ' exists');
				} else {
					result.data[result.key] = opt.value;
				}
			} else if (result.data.constructor === Array) {
				result.data.splice(result.key, 0, opt.value);
			}
		}

		return results;
	},

	push: async function (opt) {
		opt.create = true;

		const values = [];
		const results = await this.traverse(opt);

		for (const result  of results) {
			let data = result.key === '.' ? result.data : result.data[result.key];

			if (!data) {
				continue;
			} else if (data.constructor === Object) {
				let length = Object.keys(data).length;

				let index = length;
				let key = '_' + index;

				while (key in data) {
					key = '_' + index++;
				}

				data[key] = opt.value;
				result.length = length + 1;
				values.push(result);
			} else if (data.constructor === Array) {
				data.push(opt.value);
				result.length = data.length;
				values.push(result);
			}

		}

		return values;
	},

	remove: async function (opt) {
		opt.create = false;

		const values = [];
		const results = await this.traverse(opt);
		const star = opt.keys.slice(-1)[0];

		for (const result of results) {

			if (!result.data || !result.parent) continue;
			if (opt.value !== undefined && result.data !== opt.value) continue

			if (result.parent.constructor === Object) {
				delete result.parent[result.key];
			} else if (result.parent.constructor === Array) {
				if (star) {
					result.parent.shift();
				} else {
					result.parent.splice(result.key, 1);
				}
			}

			values.push(result.data);
		}

		return values;
	},


	// TODO check beneath
	find: async function (opt) {
		opt.create = false;

		const values = [];
		const results = await this.traverse(opt);

		for (const result  of results) {
			if (result.data[result.key] === opt.value) {
				values.push(result);
			}
		}

		return values;
	},

	get: async function (opt) {
		opt.create = false;

		const values = [];
		const results = await this.traverse(opt);

		// for (const result  of results) {
		// 	result.data[result.key]
		// 	values.push();
		// }

		return results;
	},

	has: async function (opt) {
		opt.create = false;

		const values = [];
		const results = await this.traverse(opt);

		for (const result  of results) {
			values.push(result.key in result.data);
		}

		return values;
	},

	size: async function (opt) {
		opt.create = false;

		const values = [];
		const results = await this.traverse(opt);

		for (const result  of results) {
			let data = result.key === '.' ? result.data : result.data[result.key];

			if (!data) {
				values.push(0);
			} else if (data.constructor === Object) {
				values.push(Object.keys(data).length);
			} else if (data.constructor === Array) {
				values.push(data.length);
			} else {
				values.push(0);
			}

		}

		return values;
	},

	// clone: async function (variable) {
	// 	let clone;
	//
	// 	if (variable === null || variable === undefined || typeof variable !== 'object') {
	//
	// 		return variable;
	//
	// 	} else if (variable.constructor === Array) {
	// 		clone = [];
	//
	// 		for (var i = 0, l = variable.length; i < l; i++) {
	// 			clone[i] = this.clone(variable[i]);
	// 		}
	//
	// 	} else if (variable.constructor === Object) {
	// 		clone = {};
	//
	// 		for (var key in variable) {
	//
	// 			if (variable.hasOwnProperty(key)) {
	// 				clone[key] = this.clone(variable[key]);
	// 			}
	//
	// 		}
	//
	// 	} else {
	// 		throw new Error('Cycni.clone - type is not supported');
	// 	}
	//
	// 	return clone;
	// },

	// operate: function (operations) {
	// 	if (!operations) throw new Error('Cycni - missing operations');
	// 	if (operations.constructor !== Array) throw new Error('Cycni - invalid operations type');
	//
	// 	let result;
	//
	// 	for (const operation of operations) {
	//
	// 		// operation.create = operation.create || false;
	//
	// 		if (operation.type in this) {
	//
	// 			if (!result)
	//
	// 			const result = this[operation.type](operation);
	//
	//
	// 		} else {
	// 			throw new Error('Cycni operation type not found');
	// 		}
	//
	// 	}
	//
	//
	//
	// }

};
