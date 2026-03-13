let render;
let aid;
let Auth;
let itemMock;

function loadRender(itemImpl = () => {}) {
  jest.resetModules();
  itemMock = jest.fn(itemImpl);

  jest.doMock('../../../../lib/generate/Item/separate.js', () => itemMock);
  jest.doMock('postman-collection', () => ({
    RequestBody: {
      MODES: {},
    },
    Item: {
      isItem(node) {
        return Boolean(node && node.__isItem);
      },
    },
  }));

  render = require('../../../../lib/generate/separate/render.js');
  aid = require('../../../../lib/aid.js');
  ({ Auth } = require('../../../../lib/generate/separate/sym.js'));
}

test('throws on unknown mapped node type', () => {
  loadRender();
  const mapped = { unknown: 42 };

  expect(() => render(mapped, aid.makeResult())).toThrow(
    'Unrecognized node type in file system mapping'
  );
});

test('renders nested location entries and forwards upstream auth', () => {
  const auth = Symbol('auth');
  loadRender((node, result, block) => {
    block.main.push('const ok = true;');
  });

  const mapped = {
    [Auth]: auth,
    folder: {
      'request.js': { __isItem: true },
    },
  };

  const output = render(mapped, aid.makeResult());

  expect(Object.keys(output)).toEqual(['folder']);
  expect(typeof output.folder['request.js']).toBe('string');
  expect(output.folder['request.js']).toContain('const ok = true;');
  expect(itemMock).toHaveBeenCalledTimes(1);
  expect(itemMock.mock.calls[0][2].auths).toEqual([auth]);
});

test('renders declares and files for separate item output', () => {
  loadRender((node, result, block) => {
    result.files.add('/tmp/fixtures/upload.csv');
    block.declares.add('payload');
    block.main.push('payload = files["/tmp/fixtures/upload.csv"];');
  });

  const group = { name: 'override-group' };
  const mapped = {
    'upload.js': {
      __isItem: true,
      group,
    },
  };

  const output = render(mapped, aid.makeResult());
  const generated = output['upload.js'];

  expect(generated).toContain('let payload;');
  expect(generated).toContain('const files = {};');
  expect(generated).toContain('open("/tmp/fixtures/upload.csv", "b")');
  expect(generated).toContain('"upload.csv"');

  const [, itemResult] = itemMock.mock.calls[0];
  expect(itemResult.group).toBe(group);
  expect(itemResult.setting.id).toBe(true);
  expect(itemResult.setting.separate).toBe(true);
});
