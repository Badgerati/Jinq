/*
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

Version: 1.0.0
*/

window.Jinq = (function() {
	function Jinq(array) {
		var jinq = Object.create(Array.prototype);
		Jinq.inject(jinq);

		if (array) {
			jinq.addAll(array);
		}

		return jinq;
	}

	Jinq.inject = function(jinq) {
		for (var item in Jinq.prototype) {
			if (Jinq.prototype.hasOwnProperty(item)) {
				jinq[item] = Jinq.prototype[item];
			}
		}

		return jinq;
	}

	Jinq.fromArray = function(array) {
		return new Jinq(array);
	}

	Jinq.isArray = function(value) {
		var str = Object.prototype.toString.call(value);
		return str.toLowerCase() === '[object array]';
	}

	Jinq.prototype = {
		add: function(item) {
			Array.prototype.push.call(this, item);
			return this;
		},

		addAll: function(array) {
			for (var i = 0; i < array.length; i++) {
				this.add(array[i]);
			}

			return this;
		},

		removeAt: function(index) {
			Array.prototype.splice.call(this, index, 1);
			return this;
		},

		removeItem: function(item, from, first) {
			var index = -1;

			if (first) {
				index = this.indexOf(item, from);
				if (index > -1) {
					this.removeAt(index);
				}
			}
			else {
				while ((index = this.indexOf(item, from)) !== -1) {
					this.removeAt(index);
				}
			}

			return this;
		},

		removeAmount: function(amount, from) {
			amount = amount || 0;
			from = from || 0;

			if (amount === 0) {
				return this;
			}

			Array.prototype.splice.call(this, from, amount);
			return this;
		},

		remove: function(func) {
			if (func) {
				for (var i = 0; i < this.length; i++) {
					if (func(this[i])) {
						this.removeAt(i);
						i--;
					}
				}

				return this;
			}
			else {
				throw new Error('No function passed to Remove');
			}
		},

		indexOf: function(item, from) {
			from = from || 0;

			if (Array.prototype.indexOf) {
				return Array.prototype.indexOf.call(this, item, from);
			}
			else {
				while (from < this.length) {
					if (this[from] === item) {
						return from;
					}
					++from;
				}

				return -1;
			}
		},

		clear: function() {
			Array.prototype.splice.call(this, 0, this.length);
			return this;
		},

		isEmpty: function() {
			return this.length === 0;
		},

		foreach: function(func) {
			for (var i = 0; i < this.length; i++) {
				func(this[i], i);
			}

			return this;
		},

		count: function(func) {
			var count = 0;

			for (var i = 0; i < this.length; i++) {
				if (func) {
					count = count + (func(this[i]) ? 1 : 0);
				}
				else {
					count++;
				}
			}

			return count;
		},

		any: function(func) {
			return this.count(func) > 0;
		},

		first: function(func) {
			if (func) {
				var found = false;
				var first = null;

				for (var i = 0; i < this.length; i++) {
					if (func(this[i])) {
						found = true;
						first = this[i];
						break;
					}
				}

				if (!found) {
					throw new Error('No items in array that match First');
				}

				return first;
			}
			else {
				if (this.isEmpty()) {
					throw new Error('No items in array');
				}
				else {
					return this[0];
				}
			}
		},

		firstOrDefault: function(func) {
			if (func) {
				var found = false;
				var first = null;

				for (var i = 0; i < this.length; i++) {
					if (func(this[i])) {
						found = true;
						first = this[i];
						break;
					}
				}

				return found ? first : null;
			}
			else {
				return this.isEmpty() ? null : this[0];
			}
		},

		last: function(func) {
			if (func) {
				var found = false;
				var value = null;

				for (var i = this.length - 1; i >= 0; i--) {
					if (func(this[i])) {
						found = true;
						first = this[i];
						break;
					}
				}

				if (!found) {
					throw new Error('No items in array that match Last');
				}

				return value;
			}
			else {
				if (this.isEmpty()) {
					throw new Error('No items in array');
				}
				else {
					return this[this.length - 1];
				}	
			}
		},

		lastOrDefault: function(func) {
			if (func) {
				var found = false;
				var value = null;

				for (var i = this.length - 1; i >= 0; i--) {
					if (func(this[i])) {
						found = true;
						first = this[i];
						break;
					}
				}

				return found ? value : null;
			}
			else {
				return this.isEmpty() ? null : this[this.length - 1];
			}
		},

		single: function(func) {
			if (!func) {
				throw new Error('No function passed for Single');
			}

			var found = false;
			var item = null;

			for (var i = 0; i < this.length; i++) {
				if (func(this[i])) {
					if (found) {
						throw new Error('Found more than one match in Single');
					}

					found = true;
					item = this[i];
				}
			}

			if (!found) {
				throw new Error('No items in array that match Single');
			}

			return item;
		},

		singlerDefault: function(func) {
			if (!func) {
				throw new Error('No function passed for Single');
			}

			var found = false;
			var item = null;

			for (var i = 0; i < this.length; i++) {
				if (func(this[i])) {
					if (found) {
						throw new Error('Found more than one match in Single');
					}

					found = true;
					item = this[i];
				}
			}

			return found ? item : null;
		},

		subset: function(start, end) {
			start = start || 0;
			end = end || this.length - 1;
			var jinq = new Jinq();

			for (var i = start; i <= end; i++) {
				jinq.add(this[i]);
			}

			return jinq;
		},

		skip: function(amount) {
			amount = amount || 0;
			return this.clone().removeAmount(amount, 0);
		},

		take: function(amount) {
			amount = amount || 0;
			return this.subset(0, amount - 1);
		},

		sum: function(func) {
			var value = 0;

			if (func) {
				var v = 0;

				for (var i = 0; i < this.length; i++) {
					v = func(this[i]);

					if (typeof(v) !== 'number') {
						throw new Error('Invalid type found for Sum: ' + typeof(v));
					}

					value += v;
				}
			}
			else {
				if (!this.isEmpty()) {
					for (var i = 0; i < this.length; i++) {
						if (typeof(this[i]) !== 'number') {
							throw new Error('Invalid type found for Sum: ' + typeof(this[i]));
						}

						value += this[i];
					}
				}
			}

			return value;
		},

		all: function(func) {
			if (!func) {
				return this.clone();
			}

			var jinq = new Jinq();

			for (var i = 0; i < this.length; i++) {
				if (func(this[i])) {
					jinq.add(this[i]);
				}
			}

			return jinq;
		},

		contains: function(func) {
			if (!func) {
				throw new Error('No function passed to Contains');
			}

			for (var i = 0; i < this.length; i++) {
				if (func(this[i])) {
					return true;
				}
			}

			return false;
		},

		containsItem: function(item) {
			return this.indexOf(item) !== -1;
		},

		intersect: function(array) {
			array = array || [];
			var jinq = new Jinq();

			for (var i = 0; i < array.length; i++) {
				if (this.containsItem(array[i])) {
					jinq.add(array[i]);
				}
			}

			return jinq;
		},

		union: function(array) {
			array = array || [];
			return this.clone().addAll(array);						
		},

		clone: function() {
			var jinq = new Jinq();
			return jinq.addAll(this);
		}

	};

	return Jinq;
}).call({});