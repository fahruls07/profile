import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ExperienceDetail() {
  const { slug } = useParams();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    axios.get('/api/profile').then(res => {
      const exp = res.data.experiences.find(item => item.slug === slug);
      setExperience(exp || null);
    });
  }, [slug]);

  if (!experience) return <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>;

  return (
    <div className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
      {/* Tombol kembali */}
      <div className="mb-6">
        <Link
          to="/experience"
          className="inline-block text-orange-600 dark:text-orange-400 hover:underline text-sm font-medium"
        >
          ← Back to Experience
        </Link>
      </div>

      {/* Konten detail */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`/assets/logos/${experience.slug}-logo.png`}
            alt={`${experience.company} logo`}
            className="w-12 h-12 object-contain"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {experience.role}
            </h2>
            <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
              {experience.company} &middot; {experience.year}
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-4">
          {experience.description}
        </p>

        {experience.stack?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.stack.map((tech, idx) => (
              <span
                key={idx}
                className="bg-orange-100 dark:bg-orange-600 text-orange-800 dark:text-white text-xs font-medium px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
