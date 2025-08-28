import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  async function submit(e){
    e.preventDefault();
    setErr('');
    try {
      const res = await fetch('/cms-api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const j = await res.json();
        setErr(j.message || 'Login failed');
        return;
      }
      const j = await res.json();
      onLogin(j.token);
    } catch(e) {
      setErr('Network error');
    }
  }

  return (
    <div style={{maxWidth:420, margin:'80px auto', padding:20, border:'1px solid #ddd'}}>
      <h2>CMS Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div style={{color:'red'}}>{err}</div>
        <button type="submit">Login</button>
      </form>
      <p>Tip: run backend seed to create admin.</p>
    </div>
  );
}
