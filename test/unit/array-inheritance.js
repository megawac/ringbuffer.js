import RingBuffer from '../../src/ringbuffer';
import assert from 'assert';

describe('array inheritted methods', function() {

  beforeEach(function() {
    this.buffer = new RingBuffer(1, 2, 3, 4);
    this.buffer.push(5, 6);
  });

  it('forEach', function() {
    var items = [];
    this.buffer.forEach((x) => items.push(x));
    assert.deepEqual(items, [3, 4, 5, 6]);
  });

  it('map', function() {
    assert.deepEqual(this.buffer.map(x => x + 1), [4, 5, 6, 7]);
  });

  it('filter', function() {
    assert.deepEqual(this.buffer.filter(x => x > 4), [5, 6]);
  });

  it('reduce', function() {
    assert.deepEqual(this.buffer.reduce((x, y) => x + y), 18);
  });

  it('some', function() {
    assert.deepEqual(this.buffer.some(x => x > 4), true);
    assert.deepEqual(this.buffer.some(x => x > 8), false);
  });

  it('every', function() {
    assert.deepEqual(this.buffer.every(x => x > 4), false);
    assert.deepEqual(this.buffer.every(x => x < 8), true);
  });

  it('indexOf', function() {
    this.buffer.push(5);
    assert.deepEqual(this.buffer.indexOf(5), 1);
    assert.deepEqual(this.buffer.indexOf(5, 2), 3);
    assert.deepEqual(this.buffer.indexOf(1), -1);
  });

  it('lastIndexOf', function() {
    this.buffer.push(5);
    assert.deepEqual(this.buffer.lastIndexOf(5), 3);
    assert.deepEqual(this.buffer.lastIndexOf(5, 2), 1);
    assert.deepEqual(this.buffer.lastIndexOf(1), -1);
  });
});
