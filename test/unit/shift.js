import RingBuffer from '../../src/ringbuffer';

describe('shift', function() {
  it('returns items and mutates buffer', function() {
    var buffer = new RingBuffer(1, 2, 3);
    expect(buffer.shift()).to.equal(1);

    expect(buffer.slice()).to.eql([2, 3]);
    buffer.shift();
    expect(buffer.slice()).to.eql([3]);
  });

  it('sets buffer properties', function() {
    var buffer = new RingBuffer(1, 2, 3);
    buffer.shift();
    expect(buffer.head).to.equal(1);
    expect(buffer.length).to.equal(2);
  });

  it('errors out of bounds', function() {
    var buffer = new RingBuffer(1, 2);
    buffer.shift();
    buffer.shift();
    expect(function() {
      buffer.shift();
    }).to.throw;
  });
});
