'use strict';

class RingBuffer {
  constructor(capacity) {
    if (arguments.length < 1) {
      throw new Error('RingBuffer must be initiated with a capacity');
    }

    this.length = this.head = 0;
    this.tail = -1;

    // Allow initiating like new RingBuffer(item1, item2, item3, ..., itemN)
    var initiatedWithData = arguments.length > 1 || typeof capacity != 'number';

    this.capacity = initiatedWithData ? arguments.length : +capacity;
    this.data = new Array(this.capacity);

    indexTo(this, this.capacity);
    if (initiatedWithData) {
      this.push(...arguments);
    }
  }

  push() {
    // Add elements to the buffer
    for (var i = 0, len = arguments.length; i < len; i++) {
      this.tail = (this.tail + 1) % this.capacity;
      this.data[this.tail] = arguments[i];
    }
    this.length = Math.min(this.length + len, this.capacity);
    computeHead(this);
    return this.length;
  }

  unshift() {
    for (var i = 0, len = arguments.length; i < len; i++) {
      this.head = mathmod(this.head - 1, this.capacity);
      // fix argument order (reversed)
      this.data[this.head] = arguments[len - i - 1];
    }

    this.length = Math.min(this.length + len, this.capacity);
    this.tail += Math.max((len + this.length) - this.capacity, 0);
    return this.length;
  }

  pop() {
    if (this.length === 0) {
      throw new Error('Cannot pop from empty buffer');
    }
    // Remove an element from the buffer and return it
    let result = this.data[this.tail];
    this.tail = mathmod(this.tail - 1, this.capacity);
    this.length -= 1;
    computeHead(this);
    return result;
  }

  shift() {
    if (this.length === 0) {
      throw new Error('Cannot shift from empty buffer');
    }
    // Remove an element from the start of the buffer and return it
    let result = this.data[this.head];
    this.head = (this.head + 1) % this.capacity;
    this.length -= 1;
    return result;
  }

  splice() {
    throw new Error('Not implemented');
  }

  get isFull() {
    return this.capacity === this.length;
  }

  sort(comparitor) {
    // Must update the data array as it may contain items out of bounds of
    // head/tail if pops/shifts have occurred
    this.data = this.slice().sort(comparitor);
    this.head = 0;
    this.tail = this.length - 1;
    return this;
  }

  empty() {
    this.head = 0;
    this.tail = -1;
    this.length = 0;
    return this;
  }

  clone() {
    var buffer = new RingBuffer(this.capacity);
    buffer.push(...this.slice());
    return buffer;
  }
}

// Mixin Array prototype methods, we don't extend directly because
// that comes with it's own bag of issues...
const arrayProto = Array.prototype;
const ringProto = RingBuffer.prototype;
Object.getOwnPropertyNames(Array.prototype).forEach(prop => {
  var method = arrayProto[prop];
  if (typeof method === 'function' && !ringProto.hasOwnProperty(prop)) {
    ringProto[prop] = method;
  }
});

if (Symbol.iterator) {
  ringProto[Symbol.iterator] = function() {
    // Like array iterator, length and items may change after init
    var index = 0;
    return {
      next: () => {
        return {
          value: index < this.length ? this[index] : void 0,
          done: ++index > this.length
        };
      }
    };
  };
}

// Cache of index getters and setters
const indexes = {};
var indexesLength = 0;

function createIndex(index) {
  indexesLength = index + 1;
  indexes[index] = {
    get: function() {
      return this.data[(index + this.head) % this.capacity];
    },
    set: function(item) {
      if (index == this.length) {
        this.length += 1;
      } else if (index > this.length) {
        throw new Error(`Index ${index} out of bound`);
      }
      this.data[(index + this.head) % this.capacity] = item;
    },
    enumerable: true
  };
}

function indexTo(instance, index) {
  for (var i = indexesLength; i < index; i++) {
    createIndex(i);
  }
  for (i = 0; i < index; i++) {
    Object.defineProperty(instance, i, indexes[i]);
  }
}

function computeHead(b) {
  b.head = mathmod(b.tail - b.length + 1, b.capacity);
}

// Returns the remainder of a floored division (ensures result is same sign as divisor).
function mathmod(dividend, divisor) {
  return ((dividend % divisor) + divisor) % divisor;
}

export default RingBuffer;
