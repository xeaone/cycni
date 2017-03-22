/*
	@preserve
	title: cycni
	version: 1.1.0
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

Cycni.paths = function (path) {
	return typeof path === 'string' && path.length > 0 ? path.split('.') : [];
};

Cycni.traverse = function (collection, path, method) {
	var key, index = 0;
	var paths = Cycni.paths(path);
	var length = paths.length;
	var last = length === 0 ? 0 : length - 1;

	for (index; index < length; index++) {
		key = paths[index];

		if (index === last) {
			return {
				key: key,
				collection: collection,
				value: method ? method.call(Cycni, collection, key) : undefined
			};
		} else {
			collection = collection[key];
		}

	}
};

Cycni.interact = function (collection, actions) {
	if (!collection) throw new Error('collection required');
	if (!actions) throw new Error('actions required');

	var resultsParent = [], resultsChild = [];
	var  i, l, c, t, result, action, condition;

	for (i = 0, l = actions.length; i < l; i++) {
		action = actions[i];

		if (collection.constructor.name === 'Array') {
			for (c = 0, t = collection.length; c < t; c++) {
				if (action.condition) {
					condition = action.condition(collection, c);
					if (condition === Cycni.BREAK) break;
					else if (condition === Cycni.CONTINUE) continue;
				}

				if (action.path) {
					result = Cycni.traverse(collection, action.path, action.action);
					if (action.base === true) collection = result.collection[result.key];
				} else {
					result = { value: action.action ? action.action.call(Cycni, collection, c) : undefined };
				}

				resultsChild.push(result.value);
			}

			resultsParent.push(resultsChild);
		} else {
			result = Cycni.traverse(collection, action.path, action.action);
			collection = action.base === true ? result.collection[result.key] : collection;
			resultsParent.push(result.value);
		}
	}

	return resultsParent;
};

export default Cycni;
