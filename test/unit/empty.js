import RingBuffer from '../../src/ringbuffer';

import assert from 'assert';

describe('empty', function() {
  it('non full buffer', function() {
    var buffer = new RingBuffer(3);
    buffer.push(1, 2);
    assert.strictEqual(buffer.empty(), buffer);
    assert.deepEqual(buffer.slice(), []);
    assert.strictEqual(buffer.length, 0);
    assert.strictEqual(buffer.capacity, 3);
  });

  it('full buffer', function() {
    var buffer = new RingBuffer(3);
    buffer.push(1, 2);
    buffer.push(3, 4);
    let res = buffer.empty();

    assert.strictEqual(res, buffer);
    assert.deepEqual(buffer.slice(), []);
    assert.strictEqual(buffer.length, 0);
    assert.strictEqual(buffer.capacity, 3);
  });
});
