import fs from 'node:fs';
import postman from 'postman-collection';

test('postman collection normalization snapshot', () => {
  const raw = JSON.parse(
    fs.readFileSync('test/material/2.1/tree.json', 'utf8')
  );
  const collection = new postman.Collection(raw);

  expect(normalizeIds(collection.toJSON())).toMatchSnapshot();
});

function normalizeIds(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeIds);
  }
  if (!value || typeof value !== 'object') {
    return value;
  }

  const output = {};
  for (const [key, child] of Object.entries(value)) {
    output[key] = key === 'id' ? '__normalized_id__' : normalizeIds(child);
  }
  return output;
}
