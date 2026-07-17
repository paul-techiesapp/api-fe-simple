import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BookListPage } from './pages/BookListPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { NewBookPage } from './pages/NewBookPage';
import './index.css';

const router = createBrowserRouter([
  { path: '/', element: <BookListPage /> },
  { path: '/books/new', element: <NewBookPage /> },
  { path: '/books/:id', element: <BookDetailPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
