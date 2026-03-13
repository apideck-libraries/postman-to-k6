import deconflict from 'generate/separate/map/deconflict';
test('clear', () => {
  expect(deconflict('apple', {}, {})).toBe('apple');
});
test('noncollision', () => {
  const container = {
    apple: {},
  };
  expect(deconflict('orange', container, {})).toBe('orange');
});
test('collision', () => {
  const container = {
    apple: {},
  };
  expect(deconflict('apple', container, {})).toBe('apple.A');
});
test('collision repeated', () => {
  const container = {
    apple: {},
    'apple.A': {},
    'apple.B': {},
  };
  expect(deconflict('apple', container, {})).toBe('apple.C');
});
test('noncollision suffix', () => {
  const container = {
    apple: {},
  };
  expect(deconflict('apple', container, {}, '.js')).toBe('apple');
});
test('collision suffix', () => {
  const container = {
    'apple.js': {},
  };
  expect(deconflict('apple', container, {}, '.js')).toBe('apple.A');
});
test('collision repeated suffix', () => {
  const container = {
    'apple.js': {},
    'apple.A.js': {},
    'apple.B.js': {},
  };
  expect(deconflict('apple', container, {}, '.js')).toBe('apple.C');
});
test('generator reuse', () => {
  const container = {};
  const generators = {};
  expect(deconflict('apple', container, generators)).toBe('apple');
  container.apple = {};
  expect(deconflict('apple', container, generators)).toBe('apple.A');
  container['apple.A'] = {};
  expect(deconflict('apple', container, generators)).toBe('apple.B');
  expect(generators.apple.next().value).toBe('C');
});
