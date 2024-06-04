import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Dashboard() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const userData = Cookies.get('user');

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="card border-0 rounded shadow-sm">
      <div className="card-header">DASHBOARD</div>
      <div className="card-body">
        Selamat datang, <strong>{user.name}</strong>
      </div>
    </div>
  );
}
