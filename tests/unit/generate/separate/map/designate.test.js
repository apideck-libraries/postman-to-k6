const mockDeconflict = jest.fn();

jest.mock('../../../../../lib/generate/separate/map/deconflict', () => mockDeconflict);

const designate = require('../../../../../lib/generate/separate/map/designate');

afterEach(() => {
  mockDeconflict.mockReset();
});

test('basic', t => {
  mockDeconflict.mockImplementation((name) => name);
  t.is(designate('apple', {}, {}), 'apple');
});

test('suffix', t => {
  mockDeconflict.mockImplementation((name) => name);
  t.is(designate('apple', {}, {}, '.js'), 'apple.js');
});

test('encode', t => {
  mockDeconflict.mockImplementation((name) => name);
  t.is(designate('About/Company', {}, {}), 'AboutCompany');
});

test('deconflict', t => {
  mockDeconflict.mockReturnValue('apple.A');
  t.is(designate('apple', {}, {}), 'apple.A');
});

test('deconflict suffix', t => {
  mockDeconflict.mockReturnValue('apple.A');
  t.is(designate('apple', {}, {}, '.js'), 'apple.A.js');
});
