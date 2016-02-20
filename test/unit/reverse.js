import RingBuffer from '../../src/ringbuffer';
import assert from 'assert';

describe('reverse', function() {

  beforeEach(function() {
    this.buffer = new RingBuffer(1, 2, 3, 4);
    this.buffer.push(5, 6);
  });

  it('mutates the buffer', function() {
    this.buffer.reverse();
    assert.deepEqual(this.buffer.slice(), [6, 5, 4, 3]);
  });

  it('returns the buffer', function() {
    assert.equal(this.buffer.reverse(), this.buffer);
  });
});
