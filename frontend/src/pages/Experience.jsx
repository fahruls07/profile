import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios.get('/api/profile').then((res) => {
      setExperiences(res.data.experiences || []);
    });
  }, []);

  return (
    <div className="px-4 sm:px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-10 text-center text-orange-500">
        Experience
      </h1>

      <div className="relative space-y-10">
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex ${isLeft ? 'justify-start' : 'justify-end'} w-full`}
            >
              <div className="relative bg-white/80 dark:bg-white/10 backdrop-blur-md text-gray-800 dark:text-gray-200 w-full sm:w-4/5 md:w-1/2 p-6 rounded-xl shadow-lg border border-orange-300 dark:border-orange-700">
                <div className="absolute top-2 left-2 w-3 h-3 bg-orange-500 rounded-full shadow-md"></div>
                <h2 className="text-xl font-semibold mb-1">{exp.role}</h2>
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-3">
                  {exp.company} &middot; {exp.year}
                </p>
                <p className="mb-4 whitespace-pre-line leading-relaxed text-sm">
                  {exp.description}
                </p>

                {exp.stack && exp.stack.length > 0 && (
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
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}