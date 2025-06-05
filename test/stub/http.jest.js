const Reset = Symbol.for('reset');

const http = {
  request: jest.fn(),
  [Reset]() {
    this.request.mockReset();
  },
};

module.exports = http;
