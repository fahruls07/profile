import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  if (!experience) {
    return (
      <div className="text-center py-10 text-gray-600 dark:text-gray-300 animate-pulse">
        Loading experience details...
      </div>
    );
  }

  return (
    <motion.div
      className="px-4 sm:px-6 py-10 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/experience">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-block px-4 py-2 text-sm font-medium text-orange-600 dark:text-orange-300 border-2 border-transparent bg-white dark:bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm rounded-full shadow hover:shadow-md transition-all duration-300"
            style={{
              borderImage: 'linear-gradient(90deg, #f97316, #facc15) 1',
              borderStyle: 'solid',
              borderWidth: '2px'
            }}
          >
            ← Back to Experience
          </motion.span>
        </Link>
      </div>

      {/* Card */}
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`/assets/logos/${experience.slug}-logo.png`}
            alt={`${experience.company} logo`}
            className="w-14 h-14 object-contain"
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

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed mb-4">
          {experience.description}
        </p>

        {/* Responsibilities */}
        {experience.responsibilities?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Key Responsibilities:
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              {experience.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {experience.stack?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {experience.stack.map((tech, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.08 }}
                className="bg-gradient-to-tr from-orange-200 via-orange-300 to-orange-400 dark:from-orange-500 dark:to-orange-600 text-orange-900 dark:text-white text-xs font-semibold px-3 py-1 rounded-full shadow hover:shadow-lg transition-all"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
