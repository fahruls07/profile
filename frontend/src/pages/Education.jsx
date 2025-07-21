import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    axios.get('/api/profile').then(res => {
      setEducation(res.data.education || []);
    });
  }, []);

  return (
    <motion.div className="p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold mb-6">Education</h1>
      {education.map((edu, i) => (
        <div key={i} className="mb-4 p-4 bg-white rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold">{edu.degree}</h2>
          <p className="text-gray-700">{edu.school}</p>
          <p className="text-sm text-gray-500">{edu.year}</p>
        </div>
      ))}
    </motion.div>
  );
}
