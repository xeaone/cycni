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
	- remove
- **Constants**
	- BREAK
	- CONTINUE

## Options
- base `Boolean` Changes the base variable to interact with.

- collection `Array, Object, Map, Set` (Infinitely nested and combinations)




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
		base: true,
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
