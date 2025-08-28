import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileEditor from './pages/ProfileEditor';
import Experiences from './pages/Experiences';
import Education from './pages/Education';
import Articles from './pages/Articles';

function App(){
  const [token, setToken] = useState(localStorage.getItem('cms_token'));
  useEffect(()=> { if(token) localStorage.setItem('cms_token', token); }, [token]);

  if (!token) {
    return <Login onLogin={(t)=> setToken(t)} />;
  }

  return (
    <div style={{display:'flex', gap:20}}>
      <nav style={{width:220, padding:20, borderRight:'1px solid #ddd'}}>
        <h3>Admin</h3>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/experiences">Experiences</Link></li>
          <li><Link to="/education">Education</Link></li>
          <li><Link to="/articles">Articles</Link></li>
          <li><button onClick={()=>{ localStorage.removeItem('cms_token'); setToken(null); window.location.reload(); }}>Logout</button></li>
        </ul>
      </nav>
      <main style={{flex:1, padding:20}}>
        <Routes>
          <Route path="/" element={<Dashboard token={token} />} />
          <Route path="/profile" element={<ProfileEditor token={token} />} />
          <Route path="/experiences" element={<Experiences token={token} />} />
          <Route path="/education" element={<Education token={token} />} />
          <Route path="/articles" element={<Articles token={token} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
