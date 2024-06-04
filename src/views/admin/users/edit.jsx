import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import apiClient from '../../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const token = Cookies.get('token');
export default function UsersEdit() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validation, setValidation] = useState([]);

  apiClient.defaults.headers.common['Authorization'] = token;

  useEffect(() => {
    const fetchUser = async () => {
      await apiClient.get(`/api/admin/users/${id}`).then((response) => {
        setName(response.data.data.name);
        setEmail(response.data.data.email);
      });
    };

    fetchUser();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();

    apiClient
      .put(`/api/admin/users/${id}`, {
        name,
        email,
        password,
      })
      .then(() => {
        navigate('/admin/users');
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <div className="card border-0 rounded shadow-sm">
      <div className="card-header">EDIT USER</div>
      <div className="card-body">
        {validation.errors && (
          <div className="alert alert-danger mt-2 pb-0">
            {validation.errors.map((error, index) => (
              <p key={index}>
                {error.path} : {error.msg}
              </p>
            ))}
          </div>
        )}
        <form onSubmit={updateUser}>
          <div className="form-group mb-3">
            <label className="mb-1 fw-bold">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Full Name"
            />
          </div>

          <div className="form-group mb-3">
            <label className="mb-1 fw-bold">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Email Address"
            />
          </div>

          <div className="form-group mb-3">
            <label className="mb-1 fw-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-sm btn-primary">
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
}
