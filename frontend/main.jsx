import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('/api/profile').then(res => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>{profile.name}</h1>
      <p>{profile.title}</p>
      <p>{profile.bio}</p>

      <h2>Skills</h2>
      <ul>
        {profile.skills.map(skill => <li key={skill}>{skill}</li>)}
      </ul>

      <h2>Experience</h2>
      <ul>
        {profile.experience.map((exp, i) => (
          <li key={i}>{exp.role} at {exp.company} ({exp.year})</li>
        ))}
      </ul>

      <h2>Education</h2>
      <ul>
        {profile.education.map((edu, i) => (
          <li key={i}>{edu.degree} - {edu.school} ({edu.year})</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
