
# Cycni
A collection manipulation tool

### Overview
Cycni enables the ability to manipulation and interact with an infinitely deep collection. It provides an interface to manipulate Objects and Arrays in a seamless and consistent method.

### Install
- `npm i cycni --save`

### Examples
```js
let data = 	{
	id: '0',
	name: 'Cake',
	batters: [
		{ id: 'zero', type: 'Regular' },
		{ id: 'one', type: 'Chocolate' },
		{ id: 'two', type: 'Blueberry' }
	]
};

let opt = {
	data: data,
	keys: ['batters', 0]
};

let res = await Cycni.remove(opt);

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

console.log(res);
/*
	{ id: 'zero', type: 'Regular' }
*/
```

## Api

### Cycni.find(opt)
Returns the parent of the last key or top level.
- `opt: Object`
	- `value: Any`
	- `keys: Array`
	- `data: Object, Array`

### Cycni.get(opt)
Returns the retrieved value.
- `opt: Object`
	- `keys: Array`
	- `data: Object, Array`

### Cycni.set(opt)
If a key does not exists and the key is a String then an Object is created.
If a key does not exists and the key is a Number then an Array is created.
If the key already exists it overwrites that value.
- `opt: Object`
	- `value: Any`
	- `keys: Array`
	- `data: Object, Array`

### Cycni.add(opt)
If a key in the keys does not exist or if you try to set a key that already exists this will throw an error.
- `opt: Object`
	- `value: Any`
	- `keys: Array`
	- `data: Object, Array`

### Cycni.push(opt)
Dynamically pushes data to an Array or Object. If pushing to an Object then a key will auto generate in the form of `_N` N being the length.
- `opt: Object`
	- `value: Any`
	- `keys: Array`
		- `['.']` top level reference
	- `data: Object, Array`

### Cycni.remove(opt)
Returns any removed data.
- `opt: Object`
- `value: Any`
	- `keys: Array`
	- `data: Object, Array`

### Cycni.has(opt)
Returns true or false.
- `opt: Object`
	- `value: Any`
	- `keys: Array`
	- `data: Object, Array`

### Cycni.size(opt)
Returns the length of the Array or the length of the Keys if it is an object.
- `opt: Object`
	- `value: Any`
	- `keys: Array`
		- `['.']` top level reference
	- `data: Object, Array`

### Cycni.traverse(opt)
Returns an Object with two properties.
The last key in the keys array `res.key`.
The parent of the last key in the keys array `res.data`.
- `opt: Object`
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
