import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterFaculty = () => {
  const [formData, setFormData] = useState({
    name: '',
    facultyId: '',
    college: '',
    department: '',
    email: '',
    phone: '',
    designation: '',
    password: ''
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/auth/faculty/register`, formData);
      if (res.data.success) {
        setMessage(res.data.message);
        setFormData({ name: '', facultyId: '', college: '', department: '', email: '', phone: '', designation: '', password: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-24 px-4 bg-transparent flex justify-center items-center">
      <div className="max-w-2xl w-full premium-card p-8 bg-transparent">
        <h2 className="text-3xl font-ancient text-center mb-2 text-white">Faculty Registration</h2>
        <p className="text-center text-gray-400 text-sm mb-8">Register as an evaluator for Avinyotsav & Hackathon</p>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
        {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 font-bold">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input required type="text" className="w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Faculty ID</label>
              <input required type="text" className="w-full p-2 border rounded" value={formData.facultyId} onChange={e => setFormData({...formData, facultyId: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">College / Institution</label>
              <input required type="text" className="w-full p-2 border rounded" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <input required type="text" className="w-full p-2 border rounded" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input required type="email" className="w-full p-2 border rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input required type="text" className="w-full p-2 border rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Designation</label>
              <input required type="text" className="w-full p-2 border rounded" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input required type="password" className="w-full p-2 border rounded" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
          </div>
          
          <div className="mt-8">
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Submitting...' : 'Register as Faculty'}
            </button>
          </div>
          <div className="text-center mt-4 text-sm text-gray-400">
            Already registered? <Link to="/faculty/login" className="text-[#8b5a2b] font-bold hover:underline">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterFaculty;
