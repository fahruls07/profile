import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiBookOpen, FiAward } from 'react-icons/fi';

export default function Education() {
  const [formal, setFormal] = useState([]);
  const [nonFormal, setNonFormal] = useState([]);

  useEffect(() => {
    axios.get('/api/profile').then((res) => {
      setFormal(res.data.educationFormal || []);
      setNonFormal(res.data.educationNonFormal || []);
    });
  }, []);

  const getLogo = (institution) => {
    const slug = institution.toLowerCase().replace(/\s+/g, '-');
    return `/assets/logos/${slug}.png`;
  };

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = '/assets/logos/blank.png'; // fallback transparan
  };

  return (
    <div className="px-4 sm:px-6 py-12 max-w-5xl mx-auto">
      {/* Heading 
      <h1 className="text-2xl font-bold px-6 py-2 rounded-full border-2 border-orange-500 text-orange-100 bg-[#0f172a] w-fit mx-auto mb-10 shadow-md">
        Education
      </h1> */}
      <h1 className="relative text-3xl font-bold mb-16 text-center">
        <span className="relative z-10 px-8 py-3 inline-block text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-4 border-orange-500 rounded-full shadow-lg tracking-wide">
          Education
        </span>
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[60px] opacity-30 dark:opacity-20 pointer-events-none"
          viewBox="0 0 160 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 25C30 -5 130 55 155 25"
            stroke="#F97316"
            strokeWidth="3"
            strokeDasharray="8 4"
            strokeLinecap="round"
          />
        </svg>
      </h1>

      {/* Formal Education */}
      <section className="mb-16 p-6 border border-orange-400/40 dark:border-orange-300/20 rounded-2xl backdrop-blur-md bg-white/40 dark:bg-white/5 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          <FiAward className="text-orange-500" /> Formal Education
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {formal.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/60 dark:bg-white/5 border border-orange-300/30 dark:border-orange-400/20 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition flex items-center gap-4"
            >
              <img
                src={getLogo(edu.institution)}
                onError={handleImgError}
                alt={edu.institution}
                className="h-14 w-14 object-contain rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-orange-300">
                  {edu.institution}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {edu.degree}, {edu.major} <br />
                  <span className="text-xs">({edu.year})</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  GPA: {edu.gpa}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Non-Formal Education */}
      <section className="p-6 border border-sky-400/30 dark:border-sky-300/20 rounded-2xl backdrop-blur-md bg-white/40 dark:bg-white/5 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          <FiBookOpen className="text-sky-500" /> Non-Formal Education
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {nonFormal.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/60 dark:bg-white/5 border border-gray-300/20 dark:border-gray-700/30 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                {course.course}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {course.institution} &middot; {course.year}
              </p>

              {course.description && (
                <ul className="mt-3 space-y-2 list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
                  {course.description.split('.').map((point, i) =>
                    point.trim() ? <li key={i}>{point.trim()}</li> : null
                  )}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
