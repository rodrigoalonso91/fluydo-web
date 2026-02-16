# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

E-commerce website for **Fluydo S.A.**, an Argentine fashion accessories importer. Built with **Next.js 16** (App Router, SSR), **React 19**, **TypeScript 5**, and **Tailwind CSS 4**. Uses **Directus CMS** as the headless content backend with **PostgreSQL**.

The site is in **Spanish (es)** — all user-facing text must be written in Spanish.

## Commands

```bash
pnpm run dev       # Start Next.js dev server
pnpm run build     # Build for production
pnpm run start     # Start production server
pnpm run lint      # Run ESLint
docker-compose up -d  # Start PostgreSQL + Directus CMS (http://localhost:8055)
```

## Architecture

### Data Flow

```
Directus CMS (PostgreSQL)
  → BackofficeService (src/utils/server/backoffice.service.ts)
    → Utility functions (src/utils/server/get-*.utility.ts)
      → Next.js Server Components (src/app/**/page.tsx)
        → UI Components (src/components/)
```

### BackofficeService

Static class in `src/utils/server/backoffice.service.ts` that wraps the Directus SDK client. **All CMS data access flows through this single service.** It uses `@directus/sdk` with `rest()` and `staticToken()` transports.

When adding a new entity, you must:
1. Add the entity type to the `DirectusSchema` interface inside `backoffice.service.ts`.
2. Add a static method to `BackofficeService` for fetching the entity.

### Utility Functions (src/utils/server/)

Each `get-*.utility.ts` file fetches data via `BackofficeService` and **normalizes** raw Directus entities into clean app types. Follow this existing pattern:
- Call `BackofficeService` with the appropriate query (filter by `status: 'published'`, include nested fields via `fields` array).
- Return the normalized type (never return raw `*Entity` types to components).

The `normalizeProduct()` function and its helpers (`normalizeProductImages`, `normalizeProductColors`, `normalizeProductCategories`) in `get-product.utility.ts` are the canonical example.

### Type System (src/types/)

Two interfaces per domain model:
- **`*Entity`** — Raw Directus schema with all fields including junction tables, nullables, and metadata fields (`user_created`, `date_created`, etc.).
- **Clean type** (e.g., `Product`, `Settings`, `Category`) — Normalized for app use, camelCase properties, no junction table complexity.

All types are re-exported from `src/types/index.ts`. Always add new type files there.

### Components (src/components/)

Two categories:
- **`server-component/`** — Server components that fetch or depend on server-side data (Logo, WhatsAppFloatingButton, PurchaseConditions, HistorySection, PrimaryLinkButton, SecondaryLinkButton).
- **`ui/`** — Presentational/UI components (Navbar, Footer, Hero, ProductCard, CategoryFilter, OrderBySelect, AboutSection, CarouselNavigationButton, MobileMenu, DesktopMenu).

Both folders have barrel `index.ts` files. Always re-export new components from the appropriate barrel.

### Pages (src/app/)

Next.js App Router structure:
- `/` (`page.tsx`) — Home: Hero carousel, about section, purchase conditions, history.
- `/catalogo` (`catalogo/page.tsx`) — Product catalog with category filtering and order-by sorting.
- `/producto/[id]` (`producto/[id]/page.tsx`) — Product detail page (dynamic route). Uses `notFound()` for missing products.
- `loading.tsx` — Global loading screen.
- `not-found.tsx` — Custom 404 page.
- `layout.tsx` — Root layout with Navbar, Footer, WhatsApp button. Metadata is dynamically generated from CMS settings.

### Key Libraries

- **`syntax-sugar`** — Used for JSX control flow: `<If>`, `<Then>`, `<Else>`, `<Each>`. Use these instead of ternaries or `.map()` when rendering conditional/list content in JSX.
- **`next/image`** — Used for optimized images. Always use the `Image` component for Directus asset images.
- **`next/link`** — Used for internal navigation. Always use `Link` for internal routes.

### Assets & Images

Directus assets are accessed via `getAssetUrl(assetId)` from `src/utils/shared/asset-url.utility.ts`, which builds `${DIRECTUS_BO_URL}/assets/${assetId}`.

## Key Patterns

- **Path alias**: `@/` maps to `src/`.
- **All pages are async Server Components** — they `await` data before rendering.
- **Barrel exports**: Every folder with multiple modules has an `index.ts` barrel. Always use it for imports and keep it updated.
- **Currency formatting**: Use `Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' })` for prices.
- **Phone normalization**: Use `normalizeArgentinaPhone()` from `src/utils/shared/phone.utility.ts`.
- **Environment variables**: Accessed via `process.env.*` directly (Next.js convention). Never expose `DIRECTUS_ADMIN_APIKEY` to the client.

## Code Style

Prettier config (`.prettierrc`):
- **Tabs** for indentation (tab width: 2)
- **Single quotes**
- **No trailing commas**
- **Semicolons**: yes
- **Print width**: 130
- **Arrow parens**: avoid (`x => x`, not `(x) => x`)
- **Bracket spacing**: yes

TypeScript is configured in strict mode. Target: ES2017, Module: ESNext.

## Environment Variables

Required in `.env.local`:

| Variable | Description |
|---|---|
| `DIRECTUS_ADMIN_APIKEY` | Directus API token (server-only, never expose to client) |
| `DIRECTUS_BO_URL` | Directus instance base URL |
| `DIRECTUS_SETTINGS_ID` | UUID of the settings singleton in Directus |

## Adding New Features — Checklist

1. **New entity/collection**: Create `*Entity` + clean type in `src/types/`, export from `index.ts`, add to `DirectusSchema` in `backoffice.service.ts`, add static fetch method, create `get-*.utility.ts` with normalizer.
2. **New page**: Create folder under `src/app/`, add `page.tsx` as async Server Component, fetch data via utility functions.
3. **New component**: Place in `server-component/` or `ui/` as appropriate, export from barrel `index.ts`.
4. **All user-facing text must be in Spanish.**
