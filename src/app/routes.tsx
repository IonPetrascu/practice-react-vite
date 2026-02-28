import { createBrowserRouter, Navigate } from 'react-router';
import Home from '../pages/Home/Home';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, Component: Home },
      {
        path: 'auth',
        Component: AuthLayout,
        children: [
          { index: true, Component: () => <Navigate to="login" replace /> },
          { path: 'login', Component: Login },
          { path: 'register', Component: Register },
        ],
      },
    ],
  },
]);
