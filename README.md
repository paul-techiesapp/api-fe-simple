# api-fe-simple — Lesson 03

A minimal **Vite + React + TypeScript** frontend for the Library API.

- **Book list** (`/`) — fetched live from the backend's `GET /books`.
- **Book detail** (`/books/:id`) — currently renders **mock** data.
  👉 *Your exercise: wire this page up to the real `GET /books/:id` endpoint.*

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- The **Library API backend** running (lesson-02) on `http://localhost:3000`
  with CORS enabled.

## Getting started

```bash
# 1. Install dependencies
pnpm install

# 2. Configure the API URL
cp .env.example .env        # edit VITE_API_URL if your backend runs elsewhere

# 3. Run the dev server
pnpm dev                    # http://localhost:5173
```

If the list shows *"Could not load books. Is the backend running on :3000?"*,
start the backend and make sure it allows CORS.

## Scripts

| Command        | What it does                          |
| -------------- | ------------------------------------- |
| `pnpm dev`     | Start the Vite dev server             |
| `pnpm build`   | Type-check (`tsc`) and build for prod |
| `pnpm preview` | Preview the production build          |

## Project structure

```
src/
├── main.tsx              # Router: / → list, /books/:id → detail
├── types/book.ts         # Book type (matches the API shape)
├── api/books.ts          # fetchBooks() → GET /books
├── data/mockBook.ts      # Mock book used by the detail page
└── pages/
    ├── BookListPage.tsx   # Live list with loading & error states
    └── BookDetailPage.tsx # Mock detail page (student exercise: fetch real data)
```

## The exercise

Open `src/pages/BookDetailPage.tsx`. It currently uses `mockBook`. Replace that
with a real request to `GET /books/:id` using the `id` from the route params —
follow the same pattern as `fetchBooks()` in `src/api/books.ts`.
