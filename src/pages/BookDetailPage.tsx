import { Link, useParams } from 'react-router-dom';
import { mockBook } from '../data/mockBook';

export function BookDetailPage() {
  // The book id from the URL, e.g. /books/2 → id === "2".
  const { id } = useParams<{ id: string }>();

  // TODO(student): replace `mockBook` with a real GET /books/:id call
  // using `id` above, mirroring fetchBooks() in src/api/books.ts.
  const book = mockBook;

  return (
    <div className="container detail">
      <Link className="back-link" to="/">← Back to books</Link>
      <h1>{book.title}</h1>

      <dl>
        <dt>Route id</dt>
        <dd>{id}</dd>
        <dt>Author</dt>
        <dd>{book.author}</dd>
        <dt>ISBN</dt>
        <dd>{book.isbn ?? '—'}</dd>
        <dt>Category</dt>
        <dd>{book.category.name}</dd>
        <dt>Total copies</dt>
        <dd>{book.totalCopies}</dd>
      </dl>

      <div className="note">
        This page shows <strong>mock</strong> data. Exercise: fetch the real
        book with <code>GET /books/{id}</code> and render it here.
      </div>
    </div>
  );
}
