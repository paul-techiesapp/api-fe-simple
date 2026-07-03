/** A category a book belongs to (from lesson-02). */
export type BookCategory = {
  id: number;
  name: string;
};

/**
 * A book as returned by lesson-02's `GET /books`
 * (Prisma Book model with `include: { category: true }`).
 */
export type Book = {
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
