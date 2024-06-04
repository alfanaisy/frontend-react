import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) return <Navigate to={'/admin/dashboard'} replace />;

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-4">
        <Outlet />
      </div>
    </div>
  );
}
