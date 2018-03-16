
# Cycni
A collection manipulation tool

### Overview
Cycni enables the ability to manipulation and interact with an infinitely deep collection. It provides an interface to manipulate Objects and Arrays in a seamless and consistent method.

### Install
- `npm i cycni --save`

### Examples
```js
const Cycni = require('cycni');

let data = 	{
	id: '0',
	name: 'Cake',
	batters: [
		{ id: 'zero', type: 'Regular' },
		{ id: 'one', type: 'Chocolate' },
		{ id: 'two', type: 'Blueberry' }
	]
};

let options = {
	data: data,
	keys: ['batters', 0]
};

let result = await Cycni.remove(options);

console.log(data);
/*
	{
		id: '0',
		name: 'Cake',
		batters: [
			{ id: 'one', type: 'Chocolate' },
			{ id: 'two', type: 'Blueberry' }
		]
  	}
*/

console.log(result);
/*
	{ id: 'zero', type: 'Regular' }
*/
```

## Api
Special `options.keys` values include `.` and `*`.

- `find: Function` Returns the parent of the last key or top level.
	- `options: Object`
		- `value: Any`
		- `keys: Array`
		- `data: Object, Array`

- `get: Function` Returns the retrieved value.
	- `options: Object`
		- `keys: Array`
		- `data: Object, Array`

- `set: Function` If a key does not exists and the key is a String then an Object is created. If a key does not exists and the key is a Number then an Array is created. If the key already exists it overwrites that value.
	- `options: Object`
		- `value: Any`
		- `keys: Array`
		- `data: Object, Array`

- `add: Function` If a key in the keys does not exist or if you try to set a key that already exists this will throw an error.
	- `options: Object`
		- `value: Any`
		- `keys: Array`
		- `data: Object, Array`

- `push: Function` Dynamically pushes data to an Array or Object. If pushing to an Object then a key will auto generate in the form of `_N` N being the length.
	- `options: Object`
		- `value: Any`
		- `keys: Array`
		- `data: Object, Array`

- `remove: Function` Returns any removed data.
	- `options: Object`
		- `value: Any`
		- `keys: Array`
		- `data: Object, Array`

- `has: Function` Returns true or false.
	- `options: Object`
		- `value: Any`
		- `keys: Array`
		- `data: Object, Array`

- `size: Function` Returns the length of the Array or the length of the Keys if it is an object.
	- `options: Object`
		- `value: Any`
		- `keys: Array`
		- `data: Object, Array`

### Cycni.clone(Any)
Returns a clone.

## Authors
[AlexanderElias](https://github.com/AlexanderElias)

## License
[Why You Should Choose MPL-2.0](http://veldstra.org/2016/12/09/you-should-choose-mpl2-for-your-opensource-project.html)
This project is licensed under the MPL-2.0 License
