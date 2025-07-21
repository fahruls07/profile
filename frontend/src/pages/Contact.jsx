import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Contact() {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    axios.get('/api/profile').then(res => {
      setContact(res.data.contact);
    });
  }, []);

  if (!contact) return <p className="p-8">Loading...</p>;

  return (
    <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold mb-6">Contact</h1>
      <div className="space-y-3 text-gray-700">
        <p><strong>Email:</strong> <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a></p>
        <p><strong>LinkedIn:</strong> <a href={contact.linkedin} target="_blank" className="text-blue-600 hover:underline">{contact.linkedin}</a></p>
        <p><strong>GitHub:</strong> <a href={contact.github} target="_blank" className="text-blue-600 hover:underline">{contact.github}</a></p>
      </div>
    </motion.div>
  );
}
