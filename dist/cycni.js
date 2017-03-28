(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('Cycni', factory) :
	(global.Cycni = factory());
}(this, (function () { 'use strict';

	/*
		@preserve
		title: cycni
		version: 1.1.4
		license: mpl-2.0
		author: alexander elias
	*/

	var cycni_b = {

		clone: function (variable) {
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
		},

		paths: function (paths) {
			return paths.split('.');
		},

		traverse: function (collection, path, callback) {
			path = typeof path === 'number' ? path.toString() : path;
			path = typeof path === 'string' ? this.paths(path) : path;

			var key, index = 0;
			var length = path.length;
			var last = length === 0 ? 0 : length - 1;

			for (index; index < length; index++) {
				key = path[index];

				if (index === last) {
					return callback.call(this, collection, key);
				} else {
					collection = collection[key];
				}

			}
		},

		set: function (collection, path, value) {
			return this.traverse(collection, path, function (c, k) {
				return c[k] = value;
			});
		},

		get: function (collection, path) {
			return this.traverse(collection, path, function (c, k) {
				return c[k];
			});
		},

		has: function (collection, path, value) {
			return this.traverse(collection, path, function (c, k) {
				if (value.constructor.name === 'Function') {
					return value(c[k]) || false;
				} else if (value.constructor.name === 'RegExp') {
					return value.test(c[k]);
				} else {
					return c[k] === value;
				}
			});
		},

		remove: function (collection, path) {
			return this.traverse(collection, path, function (c, k) {
				if (c.constructor.name === 'Object') {
					delete c[k];
				} else if (c.constructor.name === 'Array') {
					c.splice(k, 1);
				}
			});
		}

	};

	return cycni_b;

})));
