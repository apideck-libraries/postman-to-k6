describe('packages/k6/http shim', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    delete global.fetch;
  });

  it('invokes fetch and normalizes the response', async () => {
    const text = jest.fn().mockResolvedValue('ok body');
    const headers = {
      forEach(callback) {
        callback('value-from-fetch', 'x-fetch-header');
      },
    };

    global.fetch = jest
      .fn()
      .mockResolvedValue({ status: 201, text, headers });

    const http = require('../packages/k6/http-fetch');
    const response = await http.request(
      'post',
      'https://example.test/endpoint',
      { foo: 'bar' },
      { headers: { 'x-test': '1' } }
    );

    expect(global.fetch).toHaveBeenCalledWith(
      'https://example.test/endpoint',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ foo: 'bar' }),
        headers: expect.objectContaining({
          'x-test': '1',
          'Content-Type': expect.stringContaining('application/json'),
        }),
      })
    );

    expect(response).toEqual({
      status: 201,
      body: 'ok body',
      headers: { 'x-fetch-header': 'value-from-fetch' },
      timings: {},
    });
  });

  it('fails when fetch is unavailable', async () => {
    delete global.fetch;
    const http = require('../packages/k6/http-fetch');
    await expect(http.request('get', 'https://example.test')).rejects.toThrow(
      'Global fetch is not available'
    );
  });
});
