# Lesson-03 — Books UI (Vite + React + TypeScript)

**Date:** 2026-07-03
**Status:** Approved

## Goal

A minimal front-end that teaches students how to:

1. Fetch a list from a real API (lesson-02's `GET /books`) and render it.
2. Navigate from a list to a detail page using client-side routing.
3. See a detail page rendered from **mock** data, which they will later re-wire
   to the real `GET /books/:id` endpoint as a self-directed exercise.

## Stack

- **Build tool:** Vite
- **Framework/language:** React + TypeScript
- **Routing:** `react-router-dom`
- **No** state library, no UI kit — plain React + a small CSS file.

## Backend contract (lesson-02)

Base URL: `http://localhost:3000`

- `GET /books` → `Book[]`
- `GET /books/:id` → `Book` (used by the student exercise, not by shipped code)

`Book` shape (from lesson-02 Prisma model + `include: { category: true }`):

```ts
type BookCategory = { id: number; name: string };

type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string | null;
  totalCopies: number;
  categoryId: number;
  category: BookCategory;
  createdAt: string;
  updatedAt: string;
};
```

### Required backend change

`main.ts` in lesson-02 does not enable CORS. Add `app.enableCors()` before
`app.listen(...)` so a browser app served from Vite (port 5173) can call
port 3000. The backend must be restarted after this change (user handles restarts).

## Structure

```
lesson-03/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── .env                       # VITE_API_URL=http://localhost:3000
├── .gitignore
└── src/
    ├── main.tsx               # BrowserRouter + route table + <React.StrictMode>
    ├── types/book.ts          # Book / BookCategory types
    ├── api/books.ts           # fetchBooks(): Promise<Book[]>
    ├── data/mockBook.ts       # a hardcoded Book for the detail page
    ├── pages/
    │   ├── BookListPage.tsx    # fetch on mount, render cards, <Link to={`/books/${id}`}>
    │   └── BookDetailPage.tsx  # useParams() id + render mockBook (TODO for students)
    └── index.css              # small, clean styles
```

## Routes

| Path          | Component        | Data source            |
| ------------- | ---------------- | ---------------------- |
| `/`           | `BookListPage`   | Real API `GET /books`  |
| `/books/:id`  | `BookDetailPage` | Mock (`data/mockBook`) |

`/` renders the list directly (no separate `/books` route needed for simplicity).

## Data flow

### BookListPage
- State: `books: Book[]`, `loading: boolean`, `error: string | null`.
- On mount (`useEffect`): call `fetchBooks()`.
  - success → set `books`, `loading=false`
  - failure → set `error` to a friendly message, `loading=false`
- Render:
  - `loading` → "Loading books…"
  - `error` → the error message + a hint ("Is the backend running on :3000?")
  - else → a list of cards; each card is a `<Link to={`/books/${book.id}`}>`
    showing title, author, and category name.

### BookDetailPage
- Read `id` from `useParams()`.
- Render the route `id` (proves routing works) and the fields of `mockBook`.
- Include a clearly-marked student TODO:
  `// TODO(student): replace mockBook with a real GET /books/:id call`
- A "← Back to books" `<Link to="/">`.

## api/books.ts

```ts
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
```

## Error / loading handling

- List page distinguishes loading, error, and loaded states.
- Fetch errors (including CORS / backend-down) surface a friendly message rather
  than a blank screen — an intentional teaching moment.

## Out of scope (YAGNI)

- Create / edit / delete books.
- Category filtering, search, pagination.
- Any state-management library.
- Real `GET /books/:id` fetch on the detail page — that is the student exercise.

## Student exercise (documented, not implemented)

On `BookDetailPage`, replace the mock data with a real call to
`GET /books/:id` using the `id` from the route, mirroring the `fetchBooks`
pattern in `api/books.ts`.
