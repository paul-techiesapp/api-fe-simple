import type { Book } from '../types/book';

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
