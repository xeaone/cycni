const SET = 2;
const GET = 3;
const REMOVE = 5;

function split (path) {
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

	p = split(p);

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

module.exports = function (options) {

	options = options || {};
	options.data = options.data || {};
	options.query = options.query || {};

	if (options.type === null || options.type === undefined) throw new Error('Missing type');
	if (options.collection === null || options.collection === undefined) throw new Error('Missing collection');

	var type = options.type;
	var clone = options.collection;

	var paths = split(options.query.path);
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

// Cycni.prototype.GET = GET;
// Cycni.prototype.SET = SET;
// Cycni.prototype.REMOVE = REMOVE;

// module.export = function (options) {
// 	options = options || {};
//
// 	options.data = options.data || {};
// 	options.query = options.query || {};
//
// 	if (options.type === null || options.type === undefined) throw new Error('Missing type');
// 	if (options.collection === null || options.collection === undefined) throw new Error('Missing collection');
//
// 	return new Cycni(options);
// }
