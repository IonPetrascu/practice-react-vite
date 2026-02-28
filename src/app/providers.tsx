import { RouterProvider } from 'react-router';
import { router } from './routes';

const Providers = () => {
  return <RouterProvider router={router} />;
};

export default Providers;
