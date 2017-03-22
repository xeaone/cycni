'use strict';

/*
	@preserve
	title: cycni
	version: 1.0.4
	license: mpl-2.0
	author: alexander elias
*/

var SET = 2;
var GET = 3;
var HAS = 4;
var REMOVE = 5;

var operators = {
	'$all': function (options) {
		if (typeof options.collection !== 'object') {
			throw new Error('* operator can only be used on objects or arrays');
		}

		var keys = Object.keys(options.collection).reverse();
		var results = [];
		var result = {};

		for (var i = 0, l = keys.length; i < l; i++) {
			options.path.splice(0, 1, keys[i]);

			result = traverse({
				type: options.type,
				path: options.path,
				value: options.value,
				condition: options.condition,
				collection: options.collection
			});

			if (result !== undefined) results.push(result);
		}

		return results;
	}
};


function split (path) {
	if (path === null || path === undefined) {
		path = [];
	} else if (path.constructor.name === 'String') {
		path = path.trim().replace('[', '.').replace(']', '').split('.');
	} else if (path.constructor.name === 'Number') {
		path = [path];
	}

	return path;
}

function condition (options) {
	var value = traverse({
		type: GET,
		path: options.condition.path,
		collection: options.collection
	});

	var name = options.condition.value.constructor.name;

	if (value === undefined || options.condition.value === undefined) {
		return false;
	} else if (name === 'RegExp') {
		return !options.condition.value.test(value);
	} else if (name === 'Function') {
		return !options.condition.value(value);
	} else {
		return options.condition.value !== value;
	}
}

function set (options) {
	return options.collection[options.key] = options.value;
}

function get (options) {
	return options.collection[options.key];
}

function has (options) {
	if (options.value && options.value.constructor.name === 'RegExp') {
		return options.value.test(options.collection[options.key]);
	} else if (options.value && options.value.constructor.name === 'Function') {
		return options.value(options.collection[options.key]);
	} else {
		return options.collection[options.key] === options.value;
	}
}

function remove (options) {
	if (options.collection.constructor.name === 'Object') {
		var result = options.collection[options.key];
		delete options.collection[options.key];
		return result;
	} else if (options.collection.constructor.name === 'Array') {
		return options.collection.splice(options.key, 1);
	}
}

function traverse (options) {
	options.path = options.path.constructor.name === 'String' ? split(options.path) : options.path;

	var length = options.path.length;
	var last = length === 0 ? 0 : length - 1;

	for (var index = 0; index < length; index++) {
		options.key = options.path[index];

		if (options.key.indexOf('$') === 0) {
			options.path.splice(0, index);
			return operators[options.key](options);
		}

		if (options.collection[options.key] === undefined) {
			if (options.type === SET) {
				if (isNaN(options.path)) {
					if (isNaN(options.path[index+1])) {
						options.collection[options.key] = {};
					} else {
						options.collection[options.key] = [];
					}
				}
			} else if (options.type === GET) {
				return undefined;
			} else if (options.type === HAS) {
				return false;
			} else if (options.type === REMOVE) {
				return undefined;
			}
		}

		if (index === last) {
			if (options.condition !== undefined && condition(options)) return undefined;

			if (options.type === SET) {
				return set(options);
			} else if (options.type === GET) {
				return get(options);
			} else if (options.type === HAS) {
				return has(options);
			} else if (options.type === REMOVE) {
				return remove(options);
			}
		}

		options.collection = options.collection[options.key];

	}
}

function interact (options) {
	if (!options.path) throw new Error('options.path required');
	if (!options.type) throw new Error('options.type required');
	if (!options.collection) throw new Error('options.collection required');

	// options.path = options.path.constructor.name === 'String' ? split(options.path) : options.path;

	return traverse({
		type: options.type,
		path: options.path,
		value: options.value,
		condition: options.condition,
		collection: options.collection,
	});
}

function Cycni () {
	this.GET = GET;
	this.SET = SET;
	this.HAS = HAS;
	this.REMOVE = REMOVE;
}

Cycni.prototype.interact = function (options) {
	if (typeof options !== 'object') throw new Error('options required');
	return interact(options);
};

Cycni.prototype.set = function (options) {
	if (typeof options !== 'object') throw new Error('options required');
	options.type = SET;
	return interact(options);
};

Cycni.prototype.get = function (options) {
	if (typeof options !== 'object') throw new Error('options required');
	options.type = GET;
	return interact(options);
};

Cycni.prototype.has = function (options) {
	if (typeof options !== 'object') throw new Error('options required');
	options.type = HAS;
	return interact(options);
};

Cycni.prototype.remove = function (options) {
	if (typeof options !== 'object') throw new Error('options required');
	options.type = REMOVE;
	return interact(options);
};

export default new Cycni();
