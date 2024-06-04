import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from '../views/auth/authLayout';
import Login from '../views/auth/login';
import Register from '../views/auth/register';
import Home from '../views/home';
import AdminLayout from '../views/admin/adminLayout';
import Dashboard from '../views/admin/dashboard';
import UsersIndex from '../views/admin/users';
import UsersCreate from '../views/admin/users/create';
import UsersEdit from '../views/admin/users/edit';

function AppRoutes() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'users', element: <UsersIndex /> },
        { path: 'users/create', element: <UsersCreate /> },
        { path: 'users/edit/:id', element: <UsersEdit /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
