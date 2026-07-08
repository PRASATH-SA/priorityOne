import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'citizen' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    // For login, we don't send role
    const payload = isLogin ? { email: formData.email, password: formData.password } : formData;

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        if (data.role === 'citizen') {
          navigate('/public-complaint');
        } else {
          navigate('/'); // Go to dashboard for MP/Officials
        }
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#eaedff]">
        <h2 className="text-3xl font-bold text-[#1f108e] text-center mb-6">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-[#57657a] mb-1">Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-2 bg-[#f2f3ff] rounded-lg outline-none focus:ring-2 focus:ring-[#1f108e]"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#57657a] mb-1">Account Type</label>
                <select 
                  className="w-full px-4 py-2 bg-[#f2f3ff] rounded-lg outline-none focus:ring-2 focus:ring-[#1f108e] text-[#131b2e]"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="citizen">Public Citizen</option>
                  <option value="official">MP / Official</option>
                </select>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-[#57657a] mb-1">Email</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-2 bg-[#f2f3ff] rounded-lg outline-none focus:ring-2 focus:ring-[#1f108e]"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#57657a] mb-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full px-4 py-2 bg-[#f2f3ff] rounded-lg outline-none focus:ring-2 focus:ring-[#1f108e]"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full py-3 bg-[#1f108e] text-white rounded-lg font-bold hover:bg-[#3730a3] transition-colors">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-[#57657a]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#1f108e] font-bold hover:underline">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
        <div className="mt-4 text-center border-t border-[#eaedff] pt-4">
          <button onClick={() => navigate('/public-complaint')} className="text-sm font-bold text-[#059669] hover:underline">
            Proceed to Public Complaint Portal →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
