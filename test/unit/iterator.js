import RingBuffer from '../../src/ringbuffer';
import assert from 'assert';

var describeSuite = Symbol.hasOwnProperty('iterator') ? describe : describe.skip.bind(describe);

describeSuite('iterators', function() {

  beforeEach(function() {
    this.buffer = new RingBuffer(1, 2, 3);
    this.buffer.push(4, 5);
  });

  it('works with for...of', function() {
    var items = [];
    for (let x of this.buffer) {
      items.push(x);
    }
    assert.deepEqual(items, [3, 4, 5]);
  });

  it('entries', function() {
    var items = [];
    for (let x of this.buffer.entries()) {
      items.push(x);
    }
    assert.deepEqual(items, [[0, 3], [1, 4], [2, 5]]);
  });

  it('keys', function() {
    var items = [];
    for (let x of this.buffer.keys()) {
      items.push(x);
    }
    assert.deepEqual(items, [0, 1, 2]);
  });
});
