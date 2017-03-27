/*
	@preserve
	title: cycni
	version: 1.1.1
	license: mpl-2.0
	author: alexander elias
*/

var Cycni = {
	BREAK: 2,
	CONTINUE: 3,
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

Cycni.set = function (collection, key, value) {
	return collection[key] = value;
};

Cycni.get = function (collection, key) {
	return collection[key];
};

Cycni.remove = function (collection, key) {
	if (collection.constructor.name === 'Object') {
		delete collection[key];
		return collection[key];
	} else if (collection.constructor.name === 'Array') {
		return collection.splice(key, 1)[0];
	}
};

Cycni.paths = function (paths) {
	return paths.split('.');
};

Cycni.traverse = function (collection, paths, method) {
	var key, index = 0;
	var length = paths.length;
	var last = length === 0 ? 0 : length - 1;

	for (index; index < length; index++) {
		key = paths[index];

		if (index === last) {
			return {
				key: key,
				collection: collection,
				value: method && method.constructor.name === 'Function' ? method.call(Cycni, collection, key) : undefined
			};
		} else {
			collection = collection[key];
		}

	}
};

Cycni.arr = function (collection, action) {
	var index = 0, length = collection.length;
	var paths, result = {}, results = [], condition;

	for (index; index < length; index++) {

		if (action.condition && action.condition.constructor.name === 'Function') {
			condition = action.condition.call(Cycni, collection, index);
			if (condition === Cycni.BREAK) break;
			else if (condition === Cycni.CONTINUE) continue;
		}

		if (action.path) {
			paths = index + '.' + action.path;
			paths = Cycni.paths(paths);
			result = Cycni.traverse(collection, paths, action.action);
		} else {
			result = {
				value: action.action && action.action.constructor.name === 'Function' ? action.action.call(Cycni, collection, index) : undefined
			};
		}

		results.push(result.value);
	}

	return results;
};

Cycni.obj = function (collection, action) {
	var paths, result;

	paths = action.path || this.base;
	paths = Cycni.paths(paths);
	result = Cycni.traverse(collection, paths, action.action);

	if (action.base === true) {
		this.base = result.key;
		this.collection = result.collection[result.key];
	}

	return result.value;
};

Cycni.interact = function (collection, actions) {
	if (!collection) throw new Error('collection required');
	if (!actions) throw new Error('actions required');

	this.base = null;
	this.collection = collection;

	var action, condition;
	var results = [], result = {};
	var index = 0, length = actions.length;

	for (index; index < length; index++) {
		action = actions[index];

		if (action.each === null || action.each === undefined) action.each = true;
		if (action.base === null || action.base === undefined) action.base = true;

		if (action.condition && action.condition.constructor.name === 'Function') {
			condition = action.condition.call(Cycni, this.collection, index);
			if (condition === Cycni.BREAK) break;
			else if (condition === Cycni.CONTINUE) continue;
		}

		if (this.collection.constructor.name === 'Array' && action.each === true) {
			result = Cycni.arr(this.collection, action);
			if (result !== undefined) results.push(result);
		} else {
			result = Cycni.obj(this.collection, action);
			if (result !== undefined) results.push(result);
		}

	}

	return results;
};

export default Cycni;
