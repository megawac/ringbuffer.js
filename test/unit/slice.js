import RingBuffer from '../../src/ringbuffer';
import assert from 'assert';

describe('slice', function() {

  beforeEach(function() {
    this.buffer = new RingBuffer(1, 2, 3);
    this.buffer.push(4, 5);
  });

  it('no index', function() {
    assert.deepEqual(this.buffer.slice(), [3, 4, 5]);
    this.buffer.push(6);
    assert.deepEqual(this.buffer.slice(), [4, 5, 6]);
  });

  it('provided start index', function() {
    assert.deepEqual(this.buffer.slice(1), [4, 5]);
    assert.deepEqual(this.buffer.slice(3), []);
    assert.deepEqual(this.buffer.slice(-2), [4, 5]);
  });

  it('provided start, end indicies', function() {
    assert.deepEqual(this.buffer.slice(0, 3), [3, 4, 5]);
    assert.deepEqual(this.buffer.slice(0, 2), [3, 4]);
    assert.deepEqual(this.buffer.slice(1, 3), [4, 5]);
    assert.deepEqual(this.buffer.slice(1, 5), [4, 5]);
    assert.deepEqual(this.buffer.slice(3, -2), []);
    assert.deepEqual(this.buffer.slice(-2, 3), [4, 5]);
    assert.deepEqual(this.buffer.slice(-2, -1), [4]);
    assert.deepEqual(this.buffer.slice(-2, -2), []);
    assert.deepEqual(this.buffer.slice(-2, 0), []);
  });
});
