# Tool Base

Minimal base architecture for a new tool inside this repository. This folder is
intentionally isolated from the root workspace so it can be copied, evolved, or
promoted later without changing the current `pp-reup-video` app.

## Documentation

Project documentation lives in [docs/SUMMARY.md](docs/SUMMARY.md).

## Structure

```txt
tool-base/
├── apps/
│   ├── server/      # Hono API shell with config and sample routes
│   └── web/         # Vite React shell with TanStack Router + Query
├── packages/
│   └── config/      # Shared config schema and server-side loader
├── config.example.json
├── package.json
└── tsconfig.json
```

## Local Commands

Run commands from `tool-base/`:

```bash
bun install
bun run dev
bun run check-types
bun run build
```

These root commands are orchestrated by `turbo` in the same style as the source
repo.

The server sample listens on port `34577`. The web sample listens on port
`34568` and proxies `/api` to the server.

## Config Loading

Server config is loaded by `@tool-base/config/server`:

1. If `SERVER_CONFIG_PATH` is set, load that absolute or relative path.
2. Otherwise load `config.json` from this folder when it exists.
3. Otherwise fall back to `config.example.json`.

`config.json` is ignored by git. Copy the example when a local override is
needed:

```bash
cp config.example.json config.json
```

The sample API exposes the public config at `GET /api/config`.

## Web Base

The web app demonstrates:

- TanStack Router file routes for `/app` and `/app/settings`.
- TanStack Query for `GET /api/sample` and `GET /api/config`.
- A typed API client in `apps/web/src/lib/api.ts`.
- Local shadcn-style component files under `apps/web/src/components/ui`.

## Intent

- Keep server, web, and config boundaries explicit.
- Provide only sample routes/components/API calls, without product logic.
- Match the main repo style: Bun workspace, Hono server, Vite React web app,
  TanStack tooling, and TypeScript-first packages.
