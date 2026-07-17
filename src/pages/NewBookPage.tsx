import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createBook, fetchCategories } from '../api/books';
import type { BookCategory } from '../types/book';

export function NewBookPage() {
  const navigate = useNavigate();

  // Reference data for the category dropdown.
  const [categories, setCategories] = useState<BookCategory[]>([]);

  // Controlled form fields (all held as strings — that's what inputs give us).
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [totalCopies, setTotalCopies] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch(() => setError('Could not load categories. Is the backend running on :3000?'));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      await createBook({
        title: title.trim(),
        author: author.trim(),
        // Only include optional fields when the user actually filled them in.
        ...(isbn.trim() && { isbn: isbn.trim() }),
        ...(totalCopies && { totalCopies: Number(totalCopies) }),
        categoryId: Number(categoryId),
      });
      navigate('/');
    } catch {
      setError('Could not create the book. Please check the fields and try again.');
      setSaving(false);
    }
  }

  return (
    <div className="container">
      <Link className="back-link" to="/">← Back to books</Link>
      <h1>New Book</h1>

      {error && <div className="state error">{error}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="The Pragmatic Programmer"
          />
        </label>

        <label>
          <span>Author</span>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="Andrew Hunt"
          />
        </label>

        <label>
          <span>ISBN <em>(optional)</em></span>
          <input
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="978-0135957059"
          />
        </label>

        <label>
          <span>Total copies <em>(optional)</em></span>
          <input
            type="number"
            min={0}
            value={totalCopies}
            onChange={(e) => setTotalCopies(e.target.value)}
            placeholder="1"
          />
        </label>

        <label>
          <span>Category</span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a category…
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <button className="btn" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Create book'}
        </button>
      </form>
    </div>
  );
}
