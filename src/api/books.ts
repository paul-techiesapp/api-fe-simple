import type { Book, BookCategory, NewBook } from '../types/book';

// Vite exposes only VITE_-prefixed env vars to the browser.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

/** Fetch every book from the lesson-02 API. */
export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json() as Promise<Book[]>;
}

/** Fetch the categories a book can belong to (for the create form's dropdown). */
export async function fetchCategories(): Promise<BookCategory[]> {
  const res = await fetch(`${API_URL}/book-categories`);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json() as Promise<BookCategory[]>;
}

/** Create a book via `POST /books`; resolves to the created book. */
export async function createBook(input: NewBook): Promise<Book> {
  const res = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json() as Promise<Book>;
}
