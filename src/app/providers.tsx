import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/authStore';
import { Toaster } from 'sonner';

const Providers = () => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    authService
      .me()
      .then((user) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [setUser, setLoading]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};

export default Providers;
