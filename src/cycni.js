/*
	@banner
	title: cycni
	version: 1.2.0
	license: mpl-2.0
	author: alexander elias

	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

var Cycni = {
	END: '$END',
	START: '$START'
};

Cycni.clone = function (variable) {
	var clone;

	if (variable === null || variable === undefined || typeof variable !== 'object') {

		return variable;

	} else if (variable.constructor.name === 'Date') {

		clone = new Date();
		clone.setTime(variable.getTime());

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
		throw new Error('Unable to clone variable. Type is not supported');
	}

	return clone;
};

Cycni.traverse = function (collection, keys, callback, create) {

	var key, index = 0;
	var length = keys.length;
	var last = length === 0 ? 0 : length - 1;

	for (index; index < last; index++) {
		key = keys[index];

		if (!(key in collection)) {
			if (create) {
				if (isNaN(keys[index+1])) {
					collection[key] = {};
				} else {
					collection[key] = [];
				}
			} else {
				return callback.call(this, new Error('Cannot read property ' + key + ' of undefined'));
			}
		}

		collection = collection[key];
	}

	return callback.call(this, undefined, collection, keys[last]);
};

Cycni.get = function (collection, keys, callback) {
	return this.traverse(collection, keys, function (e, c, k) {
		if (e) {
			return callback(e);
		} else {
			return callback(e, c[k]);
		}
	});
};

Cycni.set = function (collection, keys, value, callback) {
	return this.traverse(collection, keys, function (e, c, k) {
		if (e) {
			return callback(e);
		} else {
			if (c.constructor.name === 'Object') {
				c[k] = value;
			} else if (c.constructor.name === 'Array') {
				c.splice(k, 1, value);
			}

			return callback(e);
		}
	}, true);
};

Cycni.add = function (collection, keys, value, callback) {
	return this.traverse(collection, keys, function (e, c, k) {
		if (e) {
			return callback(e);
		} else {
			if (c.constructor.name === 'Object' && !(k in c)) {
				c[k] = value;
				return callback(e);
			} else if (c.constructor.name === 'Array' && k < 1) {
				c.splice(k === 0 ? 0 : c.length, 0, value);
				return callback(e);
			} else {
				return callback(new Error('Cannot add property ' + k + ' already exists'));
			}
		}
	});
};

Cycni.has = function (collection, keys, callback) {
	return this.traverse(collection, keys, function (e, c, k) {
		if (e) {
			return callback(e);
		} else {
			return callback(e, k in c);
		}
	});
};

Cycni.remove = function (collection, keys, callback) {
	return this.traverse(collection, keys, function (e, c, k) {
		if (e) {
			return callback(e);
		} else {
			var v;

			if (c.constructor.name === 'Object') {
				v = c[k];
				delete c[k];
			} else if (c.constructor.name === 'Array') {
				v = c.splice(k, 1);
			}

			return callback(e, v);
		}
	});
};

export default Cycni;
