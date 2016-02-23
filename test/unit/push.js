import RingBuffer from '../../src/ringbuffer';

import assert from 'assert';

describe('push', function() {
  it('pushs arguments to buffer', function() {
    var buffer = new RingBuffer(3);
    buffer.push(1, 2, 3);
    assert.deepEqual(buffer.slice(), [1, 2, 3]);
    buffer.push(4);
    assert.deepEqual(buffer.slice(), [2, 3, 4]);
    buffer.push(5, 6);
    assert.deepEqual(buffer.slice(), [4, 5, 6]);
    buffer.push(7, 8, 9);
    assert.deepEqual(buffer.slice(), [7, 8, 9]);
  });

  it('push to empty buffer with an unshift', function() {
    var buffer = new RingBuffer(3);
    buffer.push(1);
    assert.deepEqual(buffer.slice(), [1]);
    buffer.unshift(2);
    assert.deepEqual(buffer.slice(), [2, 1]);
    buffer.push(3);
    assert.deepEqual(buffer.slice(), [2, 1, 3]);
  });

  it('multi unshift before a multi push', function() {
    var buffer = new RingBuffer(5);
    buffer.unshift(1, 2);
    buffer.push(3, 4, 5);
    assert.deepEqual(buffer.slice(), [1, 2, 3, 4, 5]);
  });

  it('returns length', function() {
    var buffer = new RingBuffer(5);
    assert.equal(buffer.push(1, 2, 3), 3);
    assert.equal(buffer.tail, 2);
    assert.equal(buffer.length, 3);
  });
});
