import RingBuffer from '../../src/ringbuffer';

import assert from 'assert';

describe('accessors', function() {
  it('getting items at index', function() {
    var buffer = new RingBuffer(1, 2, 3, 4, 5, 6, 7);

    for (var i = 0; i < 7; i++) {
      assert.equal(buffer[i], i + 1);
    }
  });

  it('undefined when out of bounds? throwing better?', function() {
    var buffer = new RingBuffer(5);

    assert.equal(buffer[2], undefined);
  });

  it('setting items at defined index', function() {
    var buffer = new RingBuffer(1, 2, 3);
    for (var i = 0; i < 3; i++) {
      buffer[i] = buffer[i] + 1;
    }
    assert.deepEqual(buffer.slice(), [2, 3, 4]);
  });

  it('setting items at next index', function() {
    var buffer = new RingBuffer(5);
    buffer.push(1, 2);
    buffer[2] = 3;
    assert.deepEqual(buffer.slice(), [1, 2, 3]);
  });

  it('errors setting items past next index', function() {
    var buffer = new RingBuffer(5);
    buffer.push(1, 2);
    assert.throws(function() {
      buffer[3] = 4;
    });
  });
});
