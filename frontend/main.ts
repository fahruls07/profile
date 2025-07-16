import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile')
      .then(res => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{profile.name}</h1>
      <p className="text-xl">{profile.title}</p>
      <p className="mt-2">{profile.bio}</p>
      <h2 className="mt-4 font-semibold">Skills</h2>
      <ul>
        {profile.skills.map(skill => <li key={skill}>• {skill}</li>)}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
