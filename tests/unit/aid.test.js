import aid from '../../lib/aid';

test('SuffixGenerator 1st', () => {
  const gen = aid.SuffixGenerator();
  expect(gen.next().value).toBe(null);
});

test('SuffixGenerator 2nd', () => {
  const gen = aid.SuffixGenerator();
  gen.next();
  expect(gen.next().value).toBe('A');
});

test('SuffixGenerator 3rd', () => {
  const gen = aid.SuffixGenerator();
  gen.next();
  gen.next();
  expect(gen.next().value).toBe('B');
});

test('SuffixGenerator 2 letter', () => {
  const gen = aid.SuffixGenerator();
  for (let i = 0; i < 26 + 1; i++) {
    gen.next();
  }
  expect(gen.next().value).toBe('BA');
});

test('SuffixGenerator 3 letter', () => {
  const gen = aid.SuffixGenerator();
  for (let i = 0; i < 26 * 26 + 1; i++) {
    gen.next();
  }
  expect(gen.next().value).toBe('BAA');
});
