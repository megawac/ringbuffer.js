# JavaScript implementation of Circular buffers [![Travis build status](http://img.shields.io/travis/megawac/Nim implementation of Circular buffers.svg?style=flat)](https://travis-ci.org/megawac/ringbuffer)

A &#34;magical&#34; ring buffer implemention with clever define properties allowing it to be used as a normal array.

> A circular buffer, cyclic buffer or ring buffer is a data structure that uses a single, fixed-size buffer as if it were connected end-to-end. This structure lends itself easily to buffering data streams.
> 
> [Wikipedia](http://en.wikipedia.org/wiki/Circular_buffer)

![](http://www.boost.org/doc/libs/1_58_0/libs/circular_buffer/doc/images/circular_buffer.png)

## Motivation

There are numerous existing [JS ringbuffer implementations](https://www.npmjs.com/search?q=circular+buffer) but they require a) the user to interact with custom APIs, b) the [re-implementation of desired array APIs](https://github.com/trevnorris/cbuffer/blob/master/cbuffer.js#L157-319), c) the user to frequently convert the buffer to interact with third party libraries.

I wrote this library because I find `RingBuffer`s a lot of fun to implement (and its usually the first thing I do when I learn a lanaguage).

The goal of this library is to make the buffer appear to any third party code as an array. In fact, this implementation simply inherits most of the array API directly (including `slice`, `map`, `reverse`, `filter`, etc.). The implementation has also been tested to work with 3rd party libraries which consume arrays (`lodash.sortedIndex`).

## API

The library implements the mutator functionality of the array API, stubs several properties and inherits the remaining functionality from the array prototype. The following methods are defined or can be inheritted:

Properties:
- `buffer[<index>]`: get a value in the buffer, where index corresponds to the index after rotation
- `buffer[<index>]=`: set a value in the buffer at the provided (rotated) index
- `length`: the number of items currently in the buffer
- `capacity`: the maximum number of items the buffer can contain
- `head`: the current starting index of the buffer
- `tail`: the current ending index of the buffer
- `data`: the managed array being proxied by the buffer

Methods implemented:

`push(...items)`: append to items to the buffers end. It may overwrite values at the buffers head.
`unshift(...items)`: place items at the buffer start. It may overwrite values on the buffers tail.
`pop()`: remove last item in the buffer, and return item
`shift()`: remove first item in the buffer, and return item
`sort(fn)`: resort the buffer with a comparator.
`empty()`: clear items from buffer
`reverse()`: reverse order of buffer
`splice()`: todo

Methods inheritted:
`slice([start], [end])`:
`filter(fn, [context])`:
`find(fn, [context])`:
`findIndex(fn, [context])`:
`forEach(fn, [context])`:
`some(fn, [context])`:
`every(fn, [context])`:
`map(fn, [context])`:
`reduce(fn, initial, [context])`:
`reduceRight(fn, initial, [context])`:
`indexOf(item, [start])`:
`lastIndexOf(item, [start])`:
`includes(item, [start])`:

`[Symbol.iterator]()`: Allows a buffer to be used in an iterator (e.g. `for..of` loop)
`entries()`:

#### Usage

```js
var maxBufferSize = 5;
var b = new RingBuffer(maxBufferSize)

b.push(1, 2, 3)
b[2] // => 3
b[4] // => undefined
b.length // => 3
b.unshift(4, 5)
b.push(6)
b.push(7, 8)

b.slice() // => [4, 5, 6, 7, 8]
b[2] // => 6
b.pop() // => 8
b.length // => 4
```

