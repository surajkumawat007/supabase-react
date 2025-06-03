import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
      return;
    }

    if (data.session) {
      navigate('/dashboard'); // Correct redirection
    } else {
      alert('Login failed: no session returned.');
    }

  } catch (err) {
    console.error('Unexpected error during login:', err);
    alert('Unexpected error occurred');
  }
};


  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
