(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RingBuffer"] = factory();
	else
		root["RingBuffer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RingBuffer = function () {
	  function RingBuffer(capacity) {
	    _classCallCheck(this, RingBuffer);
	
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
	      this.push.apply(this, arguments);
	    }
	  }
	
	  _createClass(RingBuffer, [{
	    key: 'push',
	    value: function push() {
	      // Add elements to the buffer
	      for (var i = 0, len = arguments.length; i < len; i++) {
	        this.tail = (this.tail + 1) % this.capacity;
	        this.data[this.tail] = arguments[i];
	      }
	      this.length = Math.min(this.length + len, this.capacity);
	      computeHead(this);
	      return this.length;
	    }
	  }, {
	    key: 'unshift',
	    value: function unshift() {
	      for (var i = 0, len = arguments.length; i < len; i++) {
	        this.head = mathmod(this.head - 1, this.capacity);
	        // fix argument order (reversed)
	        this.data[this.head] = arguments[len - i - 1];
	      }
	
	      this.length = Math.min(this.length + len, this.capacity);
	      this.tail += Math.max(len + this.length - this.capacity, 0);
	      return this.length;
	    }
	  }, {
	    key: 'pop',
	    value: function pop() {
	      if (this.length === 0) {
	        throw new Error('Cannot pop from empty buffer');
	      }
	      // Remove an element from the buffer and return it
	      var result = this.data[this.tail];
	      this.tail = mathmod(this.tail - 1, this.capacity);
	      this.length -= 1;
	      computeHead(this);
	      return result;
	    }
	  }, {
	    key: 'shift',
	    value: function shift() {
	      if (this.length === 0) {
	        throw new Error('Cannot shift from empty buffer');
	      }
	      // Remove an element from the start of the buffer and return it
	      var result = this.data[this.head];
	      this.head = (this.head + 1) % this.capacity;
	      this.length -= 1;
	      return result;
	    }
	  }, {
	    key: 'splice',
	    value: function splice() {
	      throw new Error('Not implemented');
	    }
	  }, {
	    key: 'sort',
	    value: function sort(comparitor) {
	      // Must update the data array as it may contain items out of bounds of
	      // head/tail if pops/shifts have occurred
	      this.data = this.slice().sort(comparitor);
	      this.head = 0;
	      this.tail = this.length - 1;
	      return this;
	    }
	  }, {
	    key: 'empty',
	    value: function empty() {
	      this.head = 0;
	      this.tail = -1;
	      this.length = 0;
	      return this;
	    }
	  }, {
	    key: 'clone',
	    value: function clone() {
	      var buffer = new RingBuffer(this.capacity);
	      buffer.push.apply(buffer, _toConsumableArray(this.slice()));
	      return buffer;
	    }
	  }, {
	    key: 'isFull',
	    get: function get() {
	      return this.capacity === this.length;
	    }
	  }]);
	
	  return RingBuffer;
	}();
	
	// Mixin Array prototype methods, we don't extend directly because
	// that comes with it's own bag of issues...
	
	
	var arrayProto = Array.prototype;
	var ringProto = RingBuffer.prototype;
	Object.getOwnPropertyNames(Array.prototype).forEach(function (prop) {
	  var method = arrayProto[prop];
	  if (typeof method === 'function' && !ringProto.hasOwnProperty(prop)) {
	    ringProto[prop] = method;
	  }
	});
	
	if (typeof Symbol === 'function' && Symbol.hasOwnProperty('iterator')) {
	  ringProto[Symbol.iterator] = arrayProto[Symbol.iterator];
	}
	
	// Cache of index getters and setters
	var indexes = {};
	var indexesLength = 0;
	
	function createIndex(index) {
	  indexesLength = index + 1;
	  indexes[index] = {
	    get: function get() {
	      return this.data[(index + this.head) % this.capacity];
	    },
	    set: function set(item) {
	      if (index == this.length) {
	        this.length += 1;
	      } else if (index > this.length) {
	        throw new Error('Index ' + index + ' out of bound');
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
	  return (dividend % divisor + divisor) % divisor;
	}
	
	exports.default = RingBuffer;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ringbuffer.js.map