# Cycni
**A Collection manipulation tool**

Cycni is a collection manipulation tool. It enables the ability to get, set, remove, and interact with an infinite depth collection. It provides an interface/api to manipulate objects, arrays, and others (coming soon) in a seamless and consistent method.

More examples coming soon see the test directory more examples.

## Install
- `npm install cycni --save`
- UMD `dist/cycni.js`
- ESM import `src/cycni.b.m.js`

## Collection
- Array
- Object
- Map (Coming soon)
- Set (Coming soon)

## Api
- **Functions**
	- get
	- set
	- remove
	- interact
- **Constants**
	- GET
	- SET
	- REMOVE

## Options
- base `Number` Defaults to `0` (Changes the starting point of the working data)

- collection `Array, Object, Map, Set` (Can be nested combinations)

- query (Search a collection for the path and matching value if provided)
	- value `String, Number, RegExp, Function`
	- path `String, Number`

- data (Assigns the value to the path starting at the base)
	- value `Any`
	- path `String, Number`


## Examples

### Get
```JavaScript
var collection = {
	id: '0',
	name: 'Cake',
	batters: {
		batter: [{
			id: '0',
			type: 'Regular'
		}, {
			id: '1',
			type: 'Chocolate'
		}, {
			id: '2',
			type: 'Blueberry'
		}]
	},
	hello: ['bob']
};

var result = Cycni.get({
	collection: collection,

	base: 1, // since the base increased the
			 // working area is moved
			 //
			 // Path: 'batters.batter.0.id'
			 // Base:     3      2   1  0


	query: {
		value: '0',
		path: 'batters.batter.0.id'
	}
});

console.log(result); // { id: '0', type: 'Regular' }
```
