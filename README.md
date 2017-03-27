# Cycni
**A Collection manipulation tool**

**Warning Experimental**

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
	- clone
	- remove
	- interact
- **Constants**
	- BREAK
	- CONTINUE


## Cycni.interact
- collection `Object, Array` (Infinitely nested and combinations)
- actions `Array` an array of action objects
	- path `String` path to a value on the collection
	- each `Boolean` if collection is array apply action for each (default is true)
	- base `Boolean` changes the modifiable collection to the current path (default is true)
	- condition `Function` expects a return of `Cycni.BREAK` (ends the loop of actions) or `Cycni.CONTINUE` (skips the current action)
	- action `Function` provides two arguments `collection` and `key` it give the ability to interact with the collection accepts a return value


## Examples

### Get
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

var results = Cycni.interact(collection, [
	{
		path: 'batters',
		action: function (collection, key) {
			return Cycni.clone(collection[key]);
		}
	},
	{
		condition: function (collection, key) {
			return key === 2 ? Cycni.BREAK : undefined;
		},
		action: function (collection, key) {
			return Cycni.set(collection, key, {});
		}
	},
	{
		condition: function (collection, key) {
			return key === 0 ? Cycni.CONTINUE : undefined;
		},
		action: function (collection, key) {
			return Cycni.remove(collection, key);
		}
	}
]);

console.log(collection);
/*
{ id: '0',
  name: 'Cake',
  batters: [ {}, { id: 'u', type: 'Blueberry' } ],
  hello: [ 'bob' ] }
*/

console.log(results);
/*
[ [ { id: '0', type: 'Regular' },
    { id: '1', type: 'Chocolate' },

    { id: 'u', type: 'Blueberry' } ],
  [ {}, {}, {}, undefined ],
  [ {}, {}, {}, undefined ] ]
*/

```
