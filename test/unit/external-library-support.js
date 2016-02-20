import RingBuffer from '../../src/ringbuffer';

import _ from 'lodash';
import assert from 'assert';

describe('external library support', function() {
  it('lodash', function() {
    var buffer = new RingBuffer(3);
    buffer.push(1, 2);
    buffer.push(3, 4);
    assert.deepEqual(_.map(buffer, (x) => x * 2), [4, 6, 8]);
  });
});
