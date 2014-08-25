Jinq is a JavaScript implementation of most of the Linq functions from C# for arrays.


# Jinq Functions

## Creation
To create an instance of a Jinq array, type the following:

```javascript
//empty Jinq array
var jinq1 = new Jinq();

//Jinq array from an array
var array = [1, 2, 3];
var jinq2 = new Jinq(array);
var jinq3 = Jinq.fromArray(array);

//Jinq array from a Jinq array
var jinq4 = new Jinq(jinq2);
var jinq5 = Jinq.fromArray(jinq2);
```

## Add
Appends an item to the end of the Jinq array.

add(item)
[return: Jinq]

```javascript
var jinq = new Jinq();
jinq.add(1);

//just like with JavaScript arrays, you can add a mix of Object types
jinq.add('str');

//we can also chain the adds together
jinq.add('look').add('how').add('awesome').add('this').add('is!');
```

## AddAll
Appends a passed array of items to the end of the Jinq array.

addAll(array)
[return: Jinq]

```javascript
var jinq = new Jinq();
jinq.addAll([1, 2, 3]);

//again, we can chain these calls together
jinq.addAll([4, 5, 6]).addAll(['a', 'b', 'c']);
```

## RemoveAt
Removes an item from the Jinq array at passed index.

removeAt(index)
[return: Jinq]

```javascript
var jinq = new Jinq([1, 2, 3]);

//will remove '3' from the Jinq array
jinq.removeAt(2);
```

## RemoveItem
Removes the passed item from the Jinq array. You can optionally pass a from-index, which indicates from which index the remove should start from (default is index 0). You can also optionally pass a boolean 'first' parameter which indicates whether the remove should remove all items that match or just the first (default is false).

removeItem(item, [from, first])
[return: Jinq]

```javascript
var jinq = new Jinq([1, 2, 2, 3, 2]);

//default values will give list [1, 3]
jinq.removeItem(2);

//from index 2 will give list [1, 2, 3]
jinq.removeItem(2, 2);

//from index 0 and first only gives list [1, 2, 3, 3]
jinq.removeItem(2, 0, true); 
```

## RemoveAmount
Removes a passed amount of items from the Jinq array, starting at the passed optional from-index (default is index 0).

removeAmount(amount, [from])
[return: Jinq]

```javascript
var jinq = new Jinq([1, 2, 3, 4, 5, 6]);

//remove 3 items from index of 2 gives list [1, 2, 6]
jinq.removeAmount(3, 2);
```

## Remove
Removes the items from the Jinq array where the passed function returns true for each of the passed items.

remove(func)
[return: Jinq]

func: function(item) { ... }
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 2, 3]);

//remove item 2
jinq.remove(function(item) {
	return item === 2;
});
```

## IndexOf
Returns the index of the passed item in the Jinq array. You can optionally pass a from-index from where to start the search (default index is 0).

indexOf(item, [from])
[return: number]

```javascript
var jinq = new Jinq([1, 2, 4, 6]);

//get index of item 4, gives index of 2
var index = jinq.indexOf(4);
```

## Clear
Clears the Jinq array of all items.

clear()
[return: Jinq]

```javascript
var jinq = new Jinq([1, 2, 3]);

//clears the array
jinq.clear();
```

## IsEmpty
Returns whether the Jinq array is empty.

isEmpty()
[return: boolean]

```javascript
var jinq = new Jinq([1, 2]);

//returns false
var empty = jinq.isEmpty();
```

## Foreach
Loops through each of the items in the Jinq array, passing each item and its indes through to the passed function.

foreach(func)
[return: Jinq]

func: function(item, index)
[return: none]

```javascript
var jinq = new Jinq([1, 2, 3]);

//prints each item to the console
jinq.foreach(function(item, index) {
	console.log('item: ' + item);
});
```

## Count
Returns a count of the number of items in the Jinq array. If no function is passed, then the length of the Jinq array is returned, else a count of the number of items where the passed function returns true is returned.

count([func])
[return: number]

optional func: function(item)
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 2, 2, 2, 3]);

//returns the length of the array, 6
var length1 = jinq.count();

//return the number of 2s in the array, 4
var length2 = jinq.count(function(item) {
	return item === 2;
});
```

## Any
Returns whether the Jinq array contains any items. If no function is passed, this will return whether the Jinq array is empty, else it will return whether the Jinq array contains any items where the passed function returns true.

any([func])
[return: boolean]

optional func: function(item)
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 3]);

//returns true
var any1 = jinq.any();

//returns false
var any2 = jinq.any(function(item) {
	return item === 4;
});
```

## First
Returns the first item of the Jinq array. If no funciton is passed, this will be the first item of the Jinq array, if the Jinq array is empty then an error is thrown. If a function passed, then the first item where the passed function returns true will be returned, if no item matches then an error is thrown.

first([func])
[return: item]

optional func: function(item)
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 3]);

//first item of array
var first1 = jinq.first();

//first item 2
var first2 = jinq.first(function(item) {
	return item === 2;
});

//throws an error
var first3 = jinq.first(function(item) {
	return item === 4;
});
```

## FirstOrDefault
Returns the first item of the Jinq array, or null if one cannot be found. If no funciton is passed, this will be the first item of the Jinq array, if the Jinq array is empty then null is returned. If a function passed, then the first item where the passed function returns true will be returned, if no item matches then null is returned.

firstOrDefault([func])
[return: item or null]

optional func: function(item)
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 3]);

//first item of array
var first1 = jinq.firstOrDefault();

//first item 2
var first2 = jinq.firstOrDefault(function(item) {
	return item === 2;
});

//returns null
var first3 = jinq.firstOrDefault(function(item) {
	return item === 4;
});
```

## Last
Returns the last item of the Jinq array. If no funciton is passed, this will be the last item of the Jinq array, if the Jinq array is empty then an error is thrown. If a function passed, then the last item where the passed function returns true will be returned, if no item matches then an error is thrown.

last([func])
[return: item]

optional func: function(item)
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 3, 2]);

//last item of array
var last1 = jinq.last();

//last item 2
var last2 = jinq.last(function(item) {
	return item === 2;
});

//throws an error
var last3 = jinq.last(function(item) {
	return item === 4;
});
```

## LastOrDefault
Returns the last item of the Jinq array, or null if one cannot be found. If no funciton is passed, this will be the last item of the Jinq array, if the Jinq array is empty then null is returned. If a function passed, then the last item where the passed function returns true will be returned, if no item matches then null is returned.

lastOrDefault([func])
[return: item or null]

optional func: function(item)
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 3, 2]);

//last item of array
var last1 = jinq.lastOrDefault();

//last item 2
var last2 = jinq.lastOrDefault(function(item) {
	return item === 2;
});

//returns null
var last3 = jinq.lastOrDefault(function(item) {
	return item === 4;
});
```

## Single
Returns an item of the Jinq array, and verifies there is only one of the item in the Jinq array. If no funciton is passed, then an error is thrown. If a function passed, then an item where the passed function returns true will be returned, if more than one item, or less, matches then an error is thrown.

single(func)
[return: item]

func: function(item)
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 3, 2]);

//single item, 3
var single1 = jinq.single(function(item) {
	return item === 3;
});

//throws error for item 2
var single2 = jinq.single(function(item) {
	return item === 2;
});

//throws an error for no function
var single3 = jinq.single();
```

## SingleOrDefault
Returns an item of the Jinq array, and verifies there is only one of the item in the Jinq array. If no funciton is passed, then an error is thrown. If a function passed, then an item where the passed function returns true will be returned, if more than one item matches then an error is thrown. If no items match, null is returned.

singleOrDefault(func)
[return: item]

func: function(item)
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 3, 2]);

//single item, 3
var single1 = jinq.singleOrDefault(function(item) {
	return item === 3;
});

//throws error for item 2
var single2 = jinq.singleOrDefault(function(item) {
	return item === 2;
});

//returns null
var single3 = jinq.singleOrDefault(function(item) {
	return item === 4;
});

//throws an error for no function
var single4 = jinq.singleOrDefault();
```

## Subset
Returns a subset of the Jinq array from passed start to end indexes. The start index is defaulted to 0, and end index to the length of the Jinq array if they are not passed.

subset([start, end])
[return: Jinq]

```javascript
var jinq = new Jinq([1, 2, 3, 4]);

//neither parameters passed clones the array
var jinq1 = jinq.subset();

//subset from 1 to 3 gives [2, 3, 4]
var jinq2 = jinq.subset(1, 3);
```

## Skip
Returns a new Jinq array where the first amount of items, from the passed amount, from the current Jinq array have been skipped.

skip(amount)
[return: Jinq]

```javascript
var jinq = new Jinq([1, 2, 3, 4, 5]);

//skip the first 3 items gives [4, 5]
var jinq2 = jinq.skip(3);
```

## Take
Returns a new Jinq array of the first amount of items, from the passed amount, from the current Jinq array.

take(amount)
[return: Jinq]

```javascript
var jinq = new Jinq([1, 2, 3, 4, 5]);

//take the first 2 items gives [1, 2]
var jinq2 = jinq.take(2);
```

## Sum
Returns the sum of the items in the Jinq array. If no function is passed, then the items are summed up, but if one item is not of type number then an error is thrown. If a function is passed, then the items are summed up where the values summed are returned from the function for each item. When one returned value from the function is not a number then an error is thrown.

sum([func])
[return: number]

optional func: function(item)
[return: number]

```javascript
var jinq = new Jinq([1, 2, 3]);

//no function, returns 6
var sum1 = jinq.sum();

//with function, returns 9
var sum2 = jinq.sum(function(item) {
	return item + 1;
});

//throws error as function returns a string
var sum3 = jinq.sum(function(item) {
	return 'str';
});

//throws error as one item is a boolean
var jinq1 = new Jinq([1, 2, 'str']);
var sum4 = jinq.sum();
```

## All
Returns a new Jinq array of items from the current Jinq array. If no function is passed then a clone of the Jinq array is passed. If a function is passed, then a Jinq array containing the items where the function returns true is returned.

all([func])
[return: Jinq]

optional func: function(item)
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 3, 2, 4, 2]);

//returns a clone of the array
var jinq1 = jinq.all();

//returns array containing item 2
var jinq2 = jinq.all(function(item) {
	return item === 2;
});
```

## Contains
Returns whether the Jinq array contains an item where the passed function returns true. If no function is passed then an error is thrown.

contains(func)
[return: boolean]

func: function(item)
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 3]);

//returns true
var contains1 = jinq.contains(function(item) {
	return item === 1;
});

//throws an error
var contains2 = jinq.contains();
```

## ContainsItem
Returns whether the Jinq array contains the passed item.

containsItem(item)
[return: boolean]

```javascript
var jinq = new Jinq([1, 2, 3]);

//returns true
var contains1 = jinq.contains(1);
```

## Intersect
Returns a new Jinq array which is the intersect of the current Jinq array and the passed array.

intersect(array)
[return: Jinq]

```javascript
var jinq1 = new Jinq([1, 2, 3, 4]);
var jinq2 = new Jinq([3, 4, 5, 6]);

//returns array [3, 4]
var jinq3 = jinq1.intersect(jinq2);
```

## Union
Returns a new Jinq array which is the union of the current Jinq array and the passed array.

union(array)
[return: Jinq]

```javascript
var jinq1 = new Jinq([1, 2, 3, 4]);
var jinq2 = new Jinq([3, 4, 5, 6]);

//returns array [1, 2, 3, 4, 3, 4, 5, 6]
var jinq3 = jinq1.union(jinq2);
```

## Clone
Returns a clone of the Jinq array.

clone()
[return: Jinq]

```javascript
var jinq = new Jinq([1, 2, 3]);

//clones the array
var clone = jinq.clone();
```

# License

The MIT License (MIT)

Copyright (c) 2014 Matthew Kelly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.