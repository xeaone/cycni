function manipulate (options) {

	options.data = options.data || {};
	options.type = options.type || GET;
	options.query = options.query || {};
	options.collection = options.collection || {};

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
			var isValid = isQueryValueValid(clone, path, options.query.value);

			if (isValid) {
				return traverse(baseClone, options.data.path || basePath, options.data.value, type);
			}
		}

		clone = clone[path];

	}

}
