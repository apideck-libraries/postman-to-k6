function ensureFetch() {
  if (typeof globalThis.fetch !== 'function') {
    throw new Error('Global fetch is not available in this environment.');
  }
  return globalThis.fetch;
}

function normalizeHeaders(headers) {
  const normalized = {};
  if (!headers) {
    return normalized;
  }
  for (const [key, value] of Object.entries(headers)) {
    normalized[key] = value;
  }
  return normalized;
}

function normalizeBody(body, headers, method) {
  if (body === undefined || body === null) {
    return undefined;
  }
  const upper = method ? method.toUpperCase() : 'GET';
  if ((upper === 'GET' || upper === 'HEAD') && body !== undefined) {
    return undefined;
  }
  if (typeof body === 'string') {
    return body;
  }
  if (
    typeof URLSearchParams !== 'undefined' &&
    body instanceof URLSearchParams
  ) {
    return body;
  }
  if (typeof FormData !== 'undefined' && body instanceof FormData) {
    return body;
  }
  if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
    return body;
  }
  if (ArrayBuffer.isView(body)) {
    return body;
  }
  if (typeof body === 'object') {
    if (!Object.prototype.hasOwnProperty.call(headers, 'Content-Type')) {
      headers['Content-Type'] = 'application/json';
    }
    return JSON.stringify(body);
  }
  return String(body);
}

async function request(method = 'GET', address, body, params = {}) {
  const fetchFn = ensureFetch();
  const fetchHeaders = normalizeHeaders(params.headers);
  const normalizedMethod = method ? method.toUpperCase() : 'GET';
  const payload = normalizeBody(body, fetchHeaders, normalizedMethod);

  const options = {
    method: normalizedMethod,
    headers: fetchHeaders,
  };

  if (payload !== undefined) {
    options.body = payload;
  }

  const response = await fetchFn(address, options);
  const responseHeaders = {};
  if (response.headers && typeof response.headers.forEach === 'function') {
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });
  }

  let responseBody;
  if (typeof response.text === 'function') {
    responseBody = await response.text();
  }

  return {
    status: response.status,
    body: responseBody,
    headers: responseHeaders,
    timings: {},
  };
}

module.exports = {
  request,
};
