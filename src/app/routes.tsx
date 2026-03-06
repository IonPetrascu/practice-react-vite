import { createBrowserRouter, Navigate } from 'react-router';
import Home from '../pages/Home/Home';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        Component: ProtectedRoute,
        children: [
          {
            Component: MainLayout,
            children: [{ index: true, Component: Home }],
          },
        ],
      },
      {
        path: 'auth',
        Component: PublicRoute,
        children: [
          {
            Component: AuthLayout,
            children: [
              { index: true, Component: () => <Navigate to="login" replace /> },
              { path: 'login', Component: Login },
              { path: 'register', Component: Register },
            ],
          },
        ],
      },
    ],
  },
]);
