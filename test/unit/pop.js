import RingBuffer from '../../src/ringbuffer';

describe('pop', function() {
  it('returns items and mutates buffer', function() {
    var buffer = new RingBuffer(1, 2, 3);
    buffer.push(4, 5);
    expect(buffer.pop()).to.equal(5);

    expect(buffer.slice()).to.eql([3, 4]);
    expect(buffer.pop()).to.equal(4);
    expect(buffer.pop()).to.equal(3);
  });

  it('sets buffer properties', function() {
    var buffer = new RingBuffer(1, 2, 3);
    buffer.pop();
    expect(buffer.tail).to.equal(1);
    expect(buffer.length).to.equal(2);
  });

  it('errors out of bounds', function() {
    var buffer = new RingBuffer(1, 2);
    buffer.pop();
    buffer.pop();
    expect(function() {
      buffer.pop();
    }).to.throw;
  });
});
