import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Globe, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SmoothInput } from '../components/SmoothInput';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // AdminPanel checks auth state and will show dashboard automatically
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <Globe size={40} className="login-logo-icon" />
          <h2>Admin Portal</h2>
          <p>Aanoor Global Exports</p>
        </div>
        
        {error && <div className="login-error">{error}</div>}
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon relative">
              <Mail size={18} className="input-icon z-10" />
              <SmoothInput 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@aanoorglobalexports.com"
                required 
                className="pl-11"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon relative">
              <Lock size={18} className="input-icon z-10" />
              <SmoothInput 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="smooth password"
                required 
                className="pl-11 tracking-widest"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-100 login-btn" 
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <div className="login-footer">
          <button onClick={() => navigate('/')} className="back-link">
            &larr; Back to Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
