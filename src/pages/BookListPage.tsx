import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../api/books';
import type { Book } from '../types/book';

export function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks()
      .then((data) => setBooks(data))
      .catch(() => setError('Could not load books. Is the backend running on :3000?'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1>Library Books</h1>

      {loading && <div className="state">Loading books…</div>}
      {error && <div className="state error">{error}</div>}

      {!loading && !error && (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id}>
              <Link className="book-card" to={`/books/${book.id}`}>
                <div className="title">{book.title}</div>
                <div className="meta">by {book.author}</div>
                <span className="badge">{book.category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
