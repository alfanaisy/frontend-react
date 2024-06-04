import SidebarMenu from '../../components/SidebarMenu';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function AdminLayout() {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to={'/auth/login'} replace />;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
