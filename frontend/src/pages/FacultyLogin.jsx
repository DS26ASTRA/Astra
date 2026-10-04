import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FacultyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/auth/faculty/login`, { email, password });
      if (res.data.success) {
        login(res.data.data, 'FACULTY', res.data.data.token);
        navigate('/faculty');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-transparent px-4">
      <div className="max-w-md w-full premium-card p-8 bg-transparent">
        <h2 className="text-3xl font-ancient text-center mb-6">Faculty Login</h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input required type="email" className="w-full p-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input required type="password" className="w-full p-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full bg-[#8b5a2b]">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center border-t border-[var(--color-card-border)] pt-4">
          <p className="text-gray-400 text-sm">
            Are you a faculty member? <br/>
            <a href="/faculty-register" className="text-[#d4af37] font-bold hover:underline mt-1 inline-block">
              Request Faculty Access Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;
