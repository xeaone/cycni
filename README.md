# Cycni
**A Collection manipulation tool**

**Warning Experimental**

Cycni is a collection manipulation tool. It enables the ability to get, set, remove, and interact with an infinite depth collection. It provides an interface/api to manipulate objects, arrays, and others (coming soon) in a seamless and consistent method.

More examples coming soon see the test directory more examples.

## Install
- `npm install cycni --save`
- UMD `dist/cycni.js`
- ESM import `src/cycni.b.m.js`


## Api

## Cycni.get
- collection `Object, Array` (Infinitely nested and combinations)
- path `String, Array` key names to destination on object or array


## Cycni.set
- collection `Object, Array` infinitely nested and combinations
- path `String, Array` key names to destination on object or array to be assigned
- value `Any` the value to assign

## Cycni.remove
- collection `Object, Array` infinitely nested and combinations
- path `String, Array` key names to destination on object or array to be removed

## Cycni.traverse
- collection `Object, Array` infinitely nested and combinations
- path `String, Array` key names to destination on object or array to be removed
- callback `Function` arguments are the collection and key of the destination

## Cycni.clone
- variable `Any` clones `Object, Array, Date` or returns the value of any another


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

var results = Cycni.remove(collection, 'batters.0');

console.log(collection);
/*
{ id: '0',
  name: 'Cake',
  batters:
   [ { id: '1', type: 'Chocolate' },
     { id: 'u', type: 'Blueberry' } ],
  hello: [ 'bob' ] }
*/

console.log(results);
/*
{ id: '0', type: 'Regular' }
*/

```
