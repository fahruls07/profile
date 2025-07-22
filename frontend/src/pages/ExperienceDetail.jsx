// src/pages/ExperienceDetail.jsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ExperienceDetail() {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    axios.get('/api/profile').then((res) => {
      const data = res.data.experiences;
      const selected = data?.[id];
      setExperience(selected);
    });
  }, [id]);

  if (!experience) return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-orange-500 mb-4">
        {experience.role} @ {experience.company}
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{experience.year}</p>
      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line mb-6">
        {experience.description}
      </p>

      <h3 className="font-semibold mb-2">Technology Stack:</h3>
      <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
        {experience.stack.map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
    </div>
  );
}
