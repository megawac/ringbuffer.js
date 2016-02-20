import RingBuffer from '../../src/ringbuffer';

import assert from 'assert';

describe('sort', function() {
  beforeEach(function() {
    var buffer = this.buffer = new RingBuffer(5);
    buffer.push(3, 6, 4);
    buffer.push(2);
    buffer.push(5, 1);
    buffer.push(3);
  });

  it('sort works on a rotated buffer and mutates the buffer order', function() {
    this.buffer.sort(function(x, y) {
      return x - y;
    });
    assert.deepEqual(this.buffer.slice(), [1, 2, 3, 4, 5]);
  });

  it('after head&tail ranges have changed', function() {
    this.buffer.pop();
    this.buffer.pop();
    this.buffer.sort(function(x, y) {
      return y - x;
    });
    assert.deepEqual(this.buffer.slice(), [5, 4, 2]);
    assert.strictEqual(this.buffer.head, 0);
    assert.strictEqual(this.buffer.tail, 2);
  });

  it('resets head&tail indexes', function() {
    this.buffer.sort();
    assert.strictEqual(this.buffer.head, 0);
    assert.strictEqual(this.buffer.tail, 4);
  });
});
