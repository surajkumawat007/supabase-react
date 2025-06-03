import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleRegister = async () => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error('Signup error:', error);
      alert('Signup failed: ' + error.message);
      return;
    }

    if (data.user) {
      // Save profile data to the 'profiles' table
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            name: formData.name,
            email: formData.email
          }
        ]);

      if (insertError) {
        console.error('Insert profile error:', insertError);
        alert('Profile creation failed: ' + insertError.message);
        return;
      }

      alert('Registration successful!');
    } else {
      alert('User creation failed, no user returned');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    alert('An unexpected error occurred');
  }
};

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
