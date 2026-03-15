const Reset = Symbol.for('reset');

const k6 = {
  check: jest.fn(),
  [Reset]() {
    this.check.mockReset();
  },
};

module.exports = k6;
