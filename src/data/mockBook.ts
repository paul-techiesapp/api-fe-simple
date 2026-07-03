import type { Book } from '../types/book';

/**
 * Mock book used by the detail page.
 * STUDENT EXERCISE: replace usage of this with a real `GET /books/:id` call.
 */
export const mockBook: Book = {
  id: 0,
  title: 'The Pragmatic Programmer',
  author: 'Andrew Hunt & David Thomas',
  isbn: '9780201616224',
  totalCopies: 3,
  categoryId: 1,
  category: { id: 1, name: 'Programming' },
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};
