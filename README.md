# Cycni
A Collection manipulation tool.

Cycni is a collection manipulation tool. It enables the ability to get, set, and remove, nested collections.

Examples coming soon see test for now.

## Install
- `npm install cycni`

## Collection
- Array
- Object
- Map (Coming soon)

## Api
- get
- set
- remove
- interact

# Constants
- GET
- SET
- REMOVE

## Options
- base `Number` (Changes the starting point of the working data. Similar to change working directory if you think of it as a file system.)
- collection `Array, Object`
- query (Search a collection for the path and matching value if provided)
	- value `String, Number, RegExp, Function`
	- path `String, Number`
- data (Assigns the value to the path starting at the base)
	- value `Any`
	- path `String, Number`
