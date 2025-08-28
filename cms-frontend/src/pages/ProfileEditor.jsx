import React, { useEffect, useState } from 'react';

export default function ProfileEditor({ token }) {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(()=> {
    fetch('/cms-api/profile')
      .then(r=>r.json())
      .then(setProfile);
  }, []);

  if (!profile) return <div>Loading...</div>;

  async function save(){
    setSaving(true);
    await fetch('/cms-api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(profile)
    });
    setSaving(false);
    alert('Saved');
  }

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <label>Name</label><br/>
        <input value={profile.name||''} onChange={e=>setProfile({...profile, name: e.target.value})} />
      </div>
      <div>
        <label>Title</label><br/>
        <input value={profile.title||''} onChange={e=>setProfile({...profile, title: e.target.value})} />
      </div>
      <div>
        <label>About</label><br/>
        <textarea value={profile.about||''} onChange={e=>setProfile({...profile, about: e.target.value})} rows={6} />
      </div>
      <div>
        <label>Avatar URL</label><br/>
        <input value={profile.avatar||''} onChange={e=>setProfile({...profile, avatar: e.target.value})} />
      </div>
      <button onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
    </div>
  );
}
