const Reset = Symbol.for('reset');

function createStub() {
  let behavior = () => undefined;

  function stub(...args) {
    stub.calls.push(args);
    return behavior(...args);
  }

  stub.calls = [];
  stub.returns = (value) => {
    behavior = () => value;
    return stub;
  };
  stub.callsFake = (fn) => {
    behavior = fn;
    return stub;
  };
  stub.getCall = (index) => {
    if (index < 0 || index >= stub.calls.length) {
      return null;
    }
    return { args: stub.calls[index] };
  };
  stub.throws = (error) => {
    behavior = () => {
      throw error;
    };
    return stub;
  };
  stub.reset = () => {
    stub.calls = [];
    behavior = () => undefined;
  };

  Object.defineProperties(stub, {
    called: {
      get() {
        return stub.calls.length > 0;
      },
    },
    calledOnce: {
      get() {
        return stub.calls.length === 1;
      },
    },
    calledTwice: {
      get() {
        return stub.calls.length === 2;
      },
    },
    calledThrice: {
      get() {
        return stub.calls.length === 3;
      },
    },
    callCount: {
      get() {
        return stub.calls.length;
      },
    },
    firstCall: {
      get() {
        return stub.calls.length > 0 ? { args: stub.calls[0] } : null;
      },
    },
  });

  return stub;
}

const k6 = {
  check: createStub(),
  [Reset]() {
    this.check.reset();
  },
};

module.exports = k6;
