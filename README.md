# BookSearch

A responsive book discovery app built with React, TypeScript, and Vite. Search books by title, author, or genre using the Google Books API, browse results with infinite scroll, view book details, and save favorites.

## Features

- Search by title, author, and/or genre (at least one field required)
- Shareable search URLs via query parameters (`/?title=...&author=...&genre=...`)
- Infinite scroll book listing with loading skeletons
- Book detail page with description and metadata
- Favorites list (add/remove from list and detail views)
- Responsive layout for mobile, tablet, and desktop

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool and dev server
- **React Router v7** — routing and URL search params
- **TanStack React Query** — server state, caching, infinite queries
- **Tailwind CSS** + **shadcn/ui** — styling and UI components
- **Vitest** + **React Testing Library** — unit and integration tests

---

## Setup

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm

### 1. Clone and install

```bash
git clone <repository-url>
cd book-store
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
VITE_GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1/volumes
VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

Get an API key from [Google Cloud Console](https://console.cloud.google.com/) (Books API enabled).

### 3. Run the app

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### 4. Other commands

| Command | Description |
|---------|-------------|
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once (CI) |
| `npm run test:coverage` | Run tests with coverage report |

---

## Testing

Tests use **Vitest** and **React Testing Library** (Jest-compatible API).

```bash
npm run test:run
```

### What is covered

| Area | File | Tests |
|------|------|-------|
| Search form | `src/components/SearchForm/SearchForm.test.tsx` | Validation, disabled state, submission |
| Favorites | `src/context/FavoritesContext.test.tsx` | Add, remove, duplicate prevention |
| Routing | `src/routes/routing.test.tsx` | Home page, navigation to favorites |

Test utilities live in `src/test/test-utils.tsx` (providers for React Query, Router, and Favorites).

---

## Architecture & Approach

### Routing

Routing uses **React Router v7** with `createBrowserRouter` and a nested layout:

| Route | Page | Notes |
|-------|------|-------|
| `/` | Home | Search form + book list |
| `/books/:id` | Book details | Lazy-loaded with `React.Suspense` |
| `/favorites` | Favorites | Saved books grid |

`App` is the root layout (Header + `<Outlet />`). Book details are code-split to reduce initial bundle size.

**Search params** on `/` hold the active search:

```
/?title=Harry+Potter&author=Rowling&genre=Fiction
```

This makes searches bookmarkable and restores results on refresh.

### Form handling

The search form uses **controlled inputs** with local React state while the user types. On submit (button or Enter):

1. Client-side validation runs (at least one field required).
2. Non-empty values are written to the URL via `useSearchParams`.
3. `useBooks` reads the URL and triggers the API fetch.

Validation is kept simple (no react-hook-form/zod) because the form has three optional fields and one rule. Errors are shown inline below the form.

**Trade-off:** URL updates only on submit, not on every keystroke — cleaner history and fewer unnecessary API calls.

### State management

State is split by responsibility:

| State type | Solution | Used for |
|------------|----------|----------|
| **Server / API** | TanStack React Query (`useInfiniteQuery`) | Book list, book details, caching, pagination |
| **URL** | `useSearchParams` + `useSearchQuery` | Search criteria (source of truth) |
| **Client UI** | React Context (`FavoritesContext`) | Favorites list |
| **Local form** | `useState` in `SearchForm` | Input values while typing, validation errors |

**React Query** handles loading, error, and cache states for API data. `useInfiniteQuery` accumulates pages for infinite scroll instead of replacing results on each fetch.

**Favorites** live in context with `useCallback` for stable add/remove handlers. Favorites are **in-memory only** (not persisted to `localStorage`) — simple to implement, but lost on refresh.

### Infinite scroll

`BookList` uses an `IntersectionObserver` on a sentinel element at the bottom of the list. When it enters the viewport, `fetchNextPage()` is called. Skeleton loaders are shown during initial load and while fetching more pages.

**Trade-off:** IntersectionObserver behavior depends on viewport size (e.g. loader may stay visible on wide screens). The observer re-attaches when fetches complete so additional pages load until the list fills the screen or `hasNextPage` is false.

### Optimizations

- `useMemo` for flattening paginated book results
- `useCallback` for favorites add/remove
- `React.memo` on `BookCard`
- React Query `staleTime` / `gcTime` to reduce redundant API calls
- Lazy-loaded book detail page

---

## Project structure

```
src/
├── components/     # Reusable UI (Header, SearchForm, Skeletons)
├── context/        # FavoritesContext
├── hooks/          # useBooks, useSearchQuery
├── pages/          # Home, BookDetails, Favorites, BookList, BookCard
├── routes/         # Router config + routing tests
├── test/           # Test setup and utilities
├── App.tsx         # Root layout and providers
└── main.tsx        # Entry point
```

---

## Trade-offs summary

| Decision | Benefit | Cost |
|----------|---------|------|
| URL as search state | Shareable links, refresh-safe | Slightly more setup than context-only |
| React Query for API | Caching, infinite scroll, less boilerplate | Extra dependency |
| Context for favorites | Simple, fast to build | Not persisted across sessions |
| Manual form validation | Lightweight for 3 fields | Harder to scale for complex forms |
| IntersectionObserver scroll | No extra library | Can be finicky across screen sizes |
| Vitest (vs Jest) | Native Vite integration | API is Jest-compatible |
