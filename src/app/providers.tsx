import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/authStore';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

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
    <TooltipProvider>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </TooltipProvider>
  );
};

export default Providers;
