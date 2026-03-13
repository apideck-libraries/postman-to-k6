const mockDeconflict = jest.fn();
jest.mock('../../../../../lib/generate/separate/map/deconflict', () => mockDeconflict);
const designate = require('../../../../../lib/generate/separate/map/designate');
afterEach(() => {
  mockDeconflict.mockReset();
});
test('basic', () => {
  mockDeconflict.mockImplementation(name => name);
  expect(designate('apple', {}, {})).toBe('apple');
});
test('suffix', () => {
  mockDeconflict.mockImplementation(name => name);
  expect(designate('apple', {}, {}, '.js')).toBe('apple.js');
});
test('encode', () => {
  mockDeconflict.mockImplementation(name => name);
  expect(designate('About/Company', {}, {})).toBe('AboutCompany');
});
test('deconflict', () => {
  mockDeconflict.mockReturnValue('apple.A');
  expect(designate('apple', {}, {})).toBe('apple.A');
});
test('deconflict suffix', () => {
  mockDeconflict.mockReturnValue('apple.A');
  expect(designate('apple', {}, {}, '.js')).toBe('apple.A.js');
});
