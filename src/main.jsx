import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes from './routes/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);
