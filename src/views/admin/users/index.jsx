import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import apiClient from '../../../services/api';

export default function UsersIndex() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = Cookies.get('token');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = token;
      try {
        const response = await apiClient.get('/api/admin/users');

        setUsers(response.data.data);
      } catch (error) {
        console.error('Error occured while fetching the users!', error);
      }
    } else {
      console.error('Token is not available.');
    }
  };

  const deleteUser = async (id) => {
    try {
      await apiClient.delete(`/api/admin/users/${id}`);

      fetchUsers();
    } catch (error) {
      console.error('Error deleting user!');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="card border-0 rounded shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>USERS</span>
        <Link
          to="/admin/users/create"
          className="btn btn-sm btn-success rounded shadow-sm border-0"
        >
          ADD USER
        </Link>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead className="bg-dark text-white">
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Email Address</th>
              <th scope="col" style={{ width: '17%' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="d-flex flex-column  justify-content-center gap-1">
                    <Link
                      to={`/admin/users/edit/${user.id}`}
                      className="btn btn-sm btn-primary rounded-sm shadow border-0"
                    >
                      EDIT
                    </Link>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="btn btn-sm btn-danger rounded-sm shadow border-0"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="alert alert-danger mb-0">
                    Data Belum Tersedia!
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
