import RingBuffer from '../../src/ringbuffer';

import assert from 'assert';

describe('clone', function() {
  it('non full buffer', function() {
    var buffer = new RingBuffer(3);
    buffer.push(1, 2);
    var cloned = buffer.clone();
    assert.notEqual(buffer, cloned);
    assert.deepEqual(cloned.slice(), [1, 2]);
    assert.equal(cloned.length, buffer.length);
    assert.equal(cloned.capacity, 3);
  });

  it('full buffer (rotated)', function() {
    var buffer = new RingBuffer(3);
    buffer.push(1, 2);
    buffer.push(3, 4);
    var cloned = buffer.clone();
    assert.notEqual(buffer, cloned);
    assert.deepEqual(cloned.slice(), [2, 3, 4]);
    assert.equal(cloned.length, buffer.length);
    assert.equal(cloned.capacity, 3);
  });

  it('empty buffer', function() {
    var buffer = new RingBuffer(3);
    var cloned = buffer.clone();
    assert.notEqual(buffer, cloned);
    assert.equal(cloned.length, 0);
    assert.equal(cloned.capacity, 3);
  });
});
