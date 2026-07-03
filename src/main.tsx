import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BookListPage } from './pages/BookListPage';
import { BookDetailPage } from './pages/BookDetailPage';
import './index.css';

const router = createBrowserRouter([
  { path: '/', element: <BookListPage /> },
  { path: '/books/:id', element: <BookDetailPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
