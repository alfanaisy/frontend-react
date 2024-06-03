import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(!!Cookies.get('token'));

  useEffect(() => {
    const handleTokenChange = () => {
      setAuthenticated(!!Cookies.get('token'));
    };

    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
