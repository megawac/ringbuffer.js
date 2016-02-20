import RingBuffer from '../../src/ringbuffer';

import assert from 'assert';

describe('core functionality', function() {
  it('construction', function() {
    assert.ok((new RingBuffer(1)) instanceof RingBuffer);
    assert.ok((new RingBuffer(1, 2, 3)) instanceof RingBuffer);
  });
  it('Missing argument exception', function() {
    assert.throws(function() { new RingBuffer(); }, Error);
  });
  it('data', function() {
    assert.deepEqual(new RingBuffer(3).data, [,,]);
    assert.deepEqual(new RingBuffer(1, 2, 3).data, [1, 2, 3]);
  });
  it('tail', function() {
    assert.equal(new RingBuffer(3).tail, -1);
    assert.equal(new RingBuffer(1, 2, 3).tail, 2);
  });
  it('capacity', function() {
    assert.equal(new RingBuffer(3).capacity, 3);
    assert.equal(new RingBuffer(1, 2, 3).capacity, 3);
  });
  it('length', function() {
    assert.equal(new RingBuffer(3).length, 0);
    assert.equal(new RingBuffer(1, 2, 3).length, 3);
  });
  it('head', function() {
    assert.equal(new RingBuffer(3).head, 0);
    let buffer = new RingBuffer(1, 2, 3);
    assert.equal(buffer.head, 0);
    buffer.push(1, 2);
    assert.equal(buffer.head, 2);
  });

  it('isEmpty', function() {
    var buffer = new RingBuffer(3);
    assert.equal(buffer.isFull, false);
    buffer.push(1, 2);
    assert.equal(buffer.isFull, false);
    buffer.push(3);
    assert.equal(buffer.isFull, true);
  });
});
