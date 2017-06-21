# Cycni
A collection manipulation tool. It enables the ability to manipulation and interact with an infinitely deep collection. It provides an interface to manipulate objects, arrays, and others (coming soon) in a seamless and consistent method.

See the test directory for examples.

## Install
- `npm install cycni --save`
- UMD `dist/cycni.js`
- ESMD `src/cycni.js`


## Api

### Cycni.get()
- `collection: Object, Array` collection to retrieve or manipulate
- `keys: Array` key names to destination on object or array
- `callback: Function`
	- `error: Error`
	- `data: Any` the retrieved value

### Cycni.set()
Creates an object or array if the key does not exists. Overwrites if the key exists.

- `collection: Object, Array` collection to retrieve or manipulate
- `keys: Array` key names to destination on object or array
- `value: Any` the value to assign
- `callback: Function`
	- `error: Error`

### Cycni.add()
Errors if any key in the keys does not exists on the collection. Errors if the you try to set a key that already exists.

- `collection: Object, Array` collection to retrieve or manipulate
- `keys: Array` key names to destination on object or array
- `value: Any` the value to assign
- `callback: Function`
	- `error: Error`

### Cycni.remove()
- `collection: Object, Array` collection to retrieve or manipulate
- `keys: Array` key names to destination on object or array
- `callback: Function`
	- `error: Error`
	- `data: Any` the removed item from the collection

### Cycni.has()
- `collection: Object, Array` collection to retrieve or manipulate
- `keys: Array` key names to destination on object or array
- `callback: Function`
	- `error: Error`
	- `data: Boolean`

### Cycni.traverse()
- `collection: Object, Array` collection to retrieve or manipulate
- `keys: Array` key names to destination on object or array
- `callback: Function`
	- `error: Error`
	- `collection: Object, Array` the parent of the last key in the keys array
	- `key: String, Number` the last key in the keys array

### Cycni.clone()
-  `collection: Object, Array, Date` returns a clone


## Examples

### Collection
```JavaScript
var collection = {
	id: '0',
	name: 'Cake',
	batters: [{
		id: '0',
		type: 'Regular'
	}, {
		id: '1',
		type: 'Chocolate'
	}, {
		id: 'u',
		type: 'Blueberry'
	}],
	hello: ['bob']
};
```

### Remove
```JavaScript
Cycni.remove(collection, ['batters', '0'], function (error, data) {
	if (error) throw error;

	console.log(collection);
	/*
		{ id: '0',
		  name: 'Cake',
		  batters:
		   [ { id: '1', type: 'Chocolate' },
		     { id: 'u', type: 'Blueberry' } ],
		  hello: [ 'bob' ] }
	*/

	console.log(data
	/*
		{ id: '0', type: 'Regular' }
	*/
});
```
