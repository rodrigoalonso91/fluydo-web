# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

E-commerce website for Fluydo S.A. (Argentine fashion accessories importer) built with Astro 5, TypeScript, and Tailwind CSS 4. Uses Directus CMS as the content backend with PostgreSQL.

## Commands

```bash
pnpm run dev          # Start dev server (http://localhost:4321)
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run start        # Start Docker services + dev server
docker-compose up -d # Start PostgreSQL + Directus CMS (http://localhost:8055)
```

## Architecture

### Data Flow

```
Directus CMS (PostgreSQL) → BackofficeService → Utility Functions → Astro Pages → Components
```

1. **BackofficeService** (`src/server/services/backoffice.service.ts`): Static class wrapping Directus SDK client. All CMS data flows through here.

2. **Utility Functions** (`src/server/utils/`): Normalize raw Directus entities (e.g., `ProductEntity`) into clean app types (e.g., `Product`). The normalization pattern handles junction tables and nested relationships.

3. **Type System** (`src/types/`): Two interfaces per domain model:
   - `*Entity` - Raw Directus schema with all fields including junction tables
   - Clean type (e.g., `Product`) - Normalized for app use

### Key Patterns

- **Path alias**: `@/` maps to `src/`
- **SSR mode**: Server-side rendering via Netlify adapter
- **Image proxy**: `/api/image/[...path]` proxies Directus assets with caching
- **Client interactivity**: Filtering/sorting uses inline `<script>` tags in Astro components

### Pages

- `/` - Home with carousel, about section
- `/catalogo` - Product catalog with category filtering and sorting
- `/product/[id]` - Product detail (dynamic route)

## Code Style

Uses Prettier with tabs, single quotes, no trailing commas, 120 char width. See `.prettierrc`.

## Environment Variables

Required in `.env.local`:

- `DIRECTUS_ADMIN_APIKEY` - Directus API token
- `DIRECTUS_BO_URL` - Directus instance URL
- `DIRECTUS_SETTINGS_ID` - ID of the settings singleton
