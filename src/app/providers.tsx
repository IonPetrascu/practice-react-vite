import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/authStore';

const Providers = () => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    authService
      .me()
      .then((user) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [setUser, setLoading]);

  return <RouterProvider router={router} />;
};

export default Providers;
