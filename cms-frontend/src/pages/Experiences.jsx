import React, { useEffect, useState } from 'react';

export default function Experiences({ token }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title:'', company:'', slug:'', description:'' });

  useEffect(()=> load(), []);

  async function load(){
    const r = await fetch('/cms-api/experiences');
    setItems(await r.json());
  }

  async function create(){
    await fetch('/cms-api/experiences', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(newItem)
    });
    setNewItem({ title:'', company:'', slug:'', description:'' });
    load();
  }

  async function remove(id){
    if (!confirm('Delete?')) return;
    await fetch('/cms-api/experiences/' + id, { method:'DELETE', headers: { Authorization: 'Bearer ' + token }});
    load();
  }

  return (
    <div>
      <h2>Experiences</h2>
      <div>
        <input placeholder="Title" value={newItem.title} onChange={e=>setNewItem({...newItem, title:e.target.value})}/>
        <input placeholder="Company" value={newItem.company} onChange={e=>setNewItem({...newItem, company:e.target.value})}/>
        <input placeholder="slug" value={newItem.slug} onChange={e=>setNewItem({...newItem, slug:e.target.value})}/>
        <button onClick={create}>Create</button>
      </div>
      <ul>
        {items.map(i => (
          <li key={i._id}>
            <strong>{i.title}</strong> @ {i.company} 
            <button onClick={()=>remove(i._id)} style={{marginLeft:10}}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
