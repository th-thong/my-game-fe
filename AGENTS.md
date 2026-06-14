# AGENTS.md - mywuwa frontend

## Project identity
- **my-game-fe**: React 19 + Vite 7 + Tailwind CSS v4 + TypeScript
- shadcn/ui (New York style), lucide-react icons
- Node 24, pnpm (see `engines` in package.json — corepack)
- Firebase Auth (Google provider) + TanStack React Query v5 + Zustand

## Commands
```sh
pnpm dev          # Vite dev server
pnpm build        # tsc -b && vite build (typecheck + build)
pnpm lint         # ESLint (flat config)
pnpm preview      # Vite preview
```

`pnpm build` runs both typecheck and build — it's the single CI verification step.

No test framework is installed.

## Key quirks
- **Runtime env vars** (`window._env_`), **not** `import.meta.env`. Loaded from `/env-config.js` injected by nginx entrypoint. See `src/config.ts` + `src/vite-env.d.ts`.
- **Config falls back to `import.meta.env`** for dev mode when `window._env_` is not available (e.g. `pnpm dev`).
- **`@/` path alias** maps to `./src/`.
- **`verbatimModuleSyntax: true`** — type imports must use `import type`.
- **`noUnusedLocals` / `noUnusedParameters`** both enabled.
- **esbuild drops `console` + `debugger`** in production builds (`vite.config.ts`).
- **401 response** from API triggers automatic Firebase `signOut()` + redirect to `/` (see `src/services/api.ts` interceptor).
- **Auth initialization** blocks the entire app with a full-screen spinner until Firebase confirms login state (see `src/App.tsx`).

## Project structure
```
src/
├── App.tsx                   # Router + global auth init
├── main.tsx                  # Entry: QueryClientProvider + StrictMode
├── config.ts                 # Runtime config from window._env_ with import.meta.env fallback
├── components/               # Shared components (NavBar, Footer, UI atoms)
├── features/{auth,banner,gachaHistory,setting}/
│   ├── components/           # Feature-specific components
│   └── hooks/                # Feature-specific hooks
├── hooks/                    # Shared data-fetching hooks (useCharacters, useEchoes, etc.)
├── layout/{Main,Auth}Layout.tsx
├── lib/{utils,firebase}.ts   # cn() helper, Firebase init
├── pages/                    # Route page components
├── services/api.ts           # Axios instance with Firebase token interceptor
└── store/                    # Zustand stores (persisted to localStorage)
```

## Build & deploy
- **GitLab CI** (`dev` branch → Docker image tagged `dev`; tags → release images)
- **Mirror to GitHub** via GitLab CI `push_to_github` job
- **GitHub Actions** CI (lint, build on push to main/dev + PRs)
- **Release tags**: `frontend-v*.*.*` format
- **Docker**: multi-stage with `node:24-alpine` build → `nginxinc/nginx-unprivileged` runtime
- **SPA routing**: nginx `try_files $uri /index.html`

## Environment

Copy `.env.example` to `.env`. Key vars:
- `VITE_IMAGE_URL` — CDN base URL for images (always used, no auth-mode conditional)
- `VITE_API_URL` — API gateway URL
- `VITE_AUTH_MODE` — `true` or `false`
- `NGINX_PORT` — Nginx runtime port
- `NGINX_SERVER_NAME` — Nginx server name
- `VITE_API_KEY`, `VITE_AUTH_DOMAIN`, `VITE_PROJECT_ID`, `VITE_STORAGE_BUCKET`, `VITE_MSG_SENDER_ID`, `VITE_APP_ID` — Firebase config
- `VITE_GAME_VERSION` — Game version for cache busting

## Misc
- `src/local/` contains experimental/unused code — ignore unless referenced.
- Husky + lint-staged configured in package.json but no `.husky/` directory yet.
