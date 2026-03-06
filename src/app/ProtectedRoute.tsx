import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <div>Загрузка...</div>;

  if (!user) return <Navigate to="/auth/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
