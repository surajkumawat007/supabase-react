import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Dashboard({ user }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error) setProfile(data);
    };

    fetchProfile();
  }, [user]);

  return (
    <div>
      <h2>Welcome, {profile?.name || 'User'}!</h2>
      <p>Email: {profile?.email || user.email}</p>
      <button onClick={() => supabase.auth.signOut()}>Logout</button>
    </div>
  );
}
