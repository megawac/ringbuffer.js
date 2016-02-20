import RingBuffer from '../../src/ringbuffer';

import assert from 'assert';

describe('unshift', function() {
  it('unshifts arguments to buffer', function() {
    var buffer = new RingBuffer(3);
    buffer.unshift(1, 2, 3);
    assert.deepEqual(buffer.slice(), [1, 2, 3]);
    buffer.unshift(4);
    assert.deepEqual(buffer.slice(), [4, 1, 2]);
    buffer.unshift(5, 6);
    assert.deepEqual(buffer.slice(), [5, 6, 4]);
    buffer.unshift(7, 8, 9);
    assert.deepEqual(buffer.slice(), [7, 8, 9]);
  });

  it('unshift to empty buffer with a push', function() {
    var buffer = new RingBuffer(3);
    buffer.unshift(1);
    assert.deepEqual(buffer.slice(), [1]);
    buffer.push(2);
    buffer.unshift(3);
    assert.deepEqual(buffer.slice(), [3, 1, 2]);
  });

  it('returns length', function() {
    var buffer = new RingBuffer(5);
    assert.equal(buffer.unshift(1, 2, 3), 3);
    assert.equal(buffer.length, 3);
  });
});
