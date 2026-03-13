# QuickPizza conversion smoke test

This folder contains an auth-free Postman collection so conversion and k6 execution are deterministic.

## Files
- `QuickPizza.postman_collection.json`

## Convert to k6
```bash
node ./bin/postman-to-k6.js examples/quickpizza/QuickPizza.postman_collection.json -o examples/quickpizza/quickpizza.k6.js
```

## Run with k6
```bash
k6 run examples/quickpizza/quickpizza.k6.js
```

## Why this flow is stable
- Uses only public endpoints (`/healthz`, `/ready`, `/api/status/*`, `/api/get|post|put|patch|delete`).
- Avoids auth-token lifecycle and cookie/CSRF differences.
- All assertions are inside `pm.test(...)`, which is required by the shim.
- Includes a capabilities section (requests `19`-`25`) that exercises common Postman test features:
  - `pm.expect(...)`
  - `pm.response.json()`
  - `pm.response.to.have/not.have` assertions (`status`, `header`, `body`, `jsonBody`)
  - pre-request variable mutation (`pm.collectionVariables`, `pm.globals`, `pm.variables`)
  - runtime metadata (`pm.info`, `pm.request`)
  - cookie roundtrip checks

## Note
If you specifically want authenticated scenarios (`/api/pizza`, `/api/ratings`), we can add a second collection once login/token behavior is stabilized.
