import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios.get('/api/profile').then(res => {
      setExperiences(res.data.experiences || []);
    });
  }, []);

  return (
    <div className="px-4 sm:px-6 py-10 max-w-4xl mx-auto">
      {/*<h1 className="text-2xl sm:text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white border-b-4 border-orange-500 inline-block px-4 pb-2 rounded-md shadow-sm">
        Experience
      </h1> */}
      <h1 className="relative text-2xl sm:text-3xl font-bold mb-12 text-center">
        <span className="relative z-10 px-6 py-2 inline-block text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-4 border-orange-500 rounded-full shadow-lg tracking-wide">
          Experience
        </span>

        {/* Dekorasi Gaya DevOps (seperti kabel awan) */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[50px] opacity-40 dark:opacity-30 pointer-events-none"
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


      <div className="space-y-12">
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          const slug = exp.company.toLowerCase().replace(/\s+/g, '-'); // URL

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative border-l-4 border-orange-500 pl-6 sm:pl-10 ${
                isEven ? 'ml-0' : 'ml-8 sm:ml-20'
              }`}
            >
              {/* Titik timeline */}
              <div className="absolute -left-[11px] top-1 w-4 h-4 bg-white border-4 border-orange-500 rounded-full shadow-md dark:bg-gray-900" />

              {/* Konten */}
              <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {exp.role}
                </h2>
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">
                  {exp.company} &middot; {exp.year}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2 whitespace-pre-line">
                  {exp.description}
                </p>

                {exp.stack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-100 dark:bg-orange-600 text-orange-800 dark:text-white text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* More details */}
                <div className="mt-4 text-right">
                  <Link
                    to={`/experience/${slug}`}
                    className="text-sm text-orange-600 hover:underline dark:text-orange-400"
                  >
                    More details &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
