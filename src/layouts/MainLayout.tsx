import { Outlet } from 'react-router';
import LogoutButton from '../components/LogoutButton/LogoutButton';

const MainLayout = () => {
  return (
    <div>
      <header>
        <LogoutButton />
      </header>
      <Outlet />
    </div>
  );
};

export default MainLayout;
