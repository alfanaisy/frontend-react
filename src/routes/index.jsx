import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../views/home';
import Register from '../views/auth/register.jsx';
import Login from '../views/auth/login.jsx';
import Dashboard from '../views/admin/dashboard/index.jsx';

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Register />
          )
        }
      />

      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
