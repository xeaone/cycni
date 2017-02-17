/*
	@preserve
	title: cycni
	version: 1.0.3
	license: mpl-2.0
	author: alexander elias
*/

var SET = 2;
var GET = 3;
var REMOVE = 5;

function queryValueSwitch (clone, path, value, callback) {
	if (value === null || value === undefined) {
		return callback(false);
	} else if (value.constructor.name === 'String' && value.includes(clone[path])) {
		return callback(true);
	} else if (value.constructor.name === 'RegExp' && value.test(clone[path])) {
		return callback(true);
	} else if (value.constructor.name === 'Function' && value(clone[path], clone, path)) {
		return callback(true);
	} else {
		return callback(false);
	}
}

function Split (path) {
	if (path === null || path === undefined) {
		return [];
	} else if (path.constructor.name === 'String') {
		path = path.replace('[', '.');
		path = path.replace(']', '');
		path = path.split('.');
	} else if (path.constructor.name === 'Number') {
		path = [path];
	}

	return path;
}

function Path (c, p, v, t) {

	if (t === null || t === undefined) {
		t = v;
		v = undefined;
	}

	if (t === GET) {
		if (p === null || p === undefined) return c;
	} else if (t === REMOVE) {
		if (p === null || p === undefined) return undefined;
	}

	p = Split(p);

	for (var i = 0, k = null, l = p.length; i < l; i++) {
		k = p[i];

		if (c[k] === null || c[k] === undefined) {
			if (t === SET) {
				if (isNaN(p)) {
					if (isNaN(p[i+1])) c[k] = {};
					else c[k] = [];
				}
			} else if (t === GET) {
				return undefined;
			} else if (t === REMOVE) {
				return undefined;
			}
		}

		if (i === l-1) {
			if (t === SET) {
				c[k] = v;
			} else if (t === GET) {
				return c[k];
			} else if (t === REMOVE) {
				if (c.constructor.name === 'Object') delete c[k];
				else if (c.constructor.name === 'Array') c.splice(k, 1);
			}
		} else {
			c = c[k];
		}
	}
}

function manipulate (options) {

	options.data = options.data || {};
	options.type = options.type || GET;
	options.query = options.query || {};
	options.collection = options.collection || {};

	var type = options.type;
	var clone = options.collection;

	var paths = Split(options.query.path);
	var length = paths.length;

	var path = null;
	var index = 0;

	var last = length === 0 ? 0 : length - 1;

	var baseIndex = options.base;
	baseIndex = baseIndex || 0;
	baseIndex = baseIndex < 0 ? 0 : baseIndex;
	baseIndex = baseIndex > last ? last : baseIndex;
	baseIndex = last - baseIndex;

	var baseClone = null;
	var basePath = null;

	for (index; index < length; index++) {
		path = paths[index];

		if (clone[path] === null || clone[path] === undefined) {
			return undefined;
		}

		if (index === baseIndex) {
			baseClone = clone;
			basePath = path;
		}

		if (index === last) {
			return queryValueSwitch(clone, path, options.query.value, function (isValid) {
				if (isValid) {
					return Path(baseClone, options.data.path || basePath, options.data.value, type);
				}
			});
		}

		clone = clone[path];

	}

}

var Cycni = {};

Cycni.GET = GET;
Cycni.SET = SET;
Cycni.REMOVE = REMOVE;

Cycni.interact = function (options) {
	options = options || {};
	return manipulate(options);
};

Cycni.get = function (options) {
	options = options || {};
	options.type = GET;
	return manipulate(options);
};

Cycni.set = function (options) {
	options = options || {};
	options.type = SET;
	return manipulate(options);
};

Cycni.remove = function (options) {
	options = options || {};
	options.type = REMOVE;
	return manipulate(options);
};

export default Cycni;
