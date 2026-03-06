import { useNavigate } from 'react-router';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/authStore';

const LogoutButton = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout().then(() => {
      setUser(null);
      navigate('/auth/login');
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
