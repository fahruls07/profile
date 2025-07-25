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
    <div className="px-4 sm:px-6 py-12 max-w-5xl mx-auto">
      {/* Heading */}
      <h1 className="relative text-3xl font-bold mb-16 text-center">
        <span className="relative z-10 px-8 py-3 inline-block text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-4 border-orange-500 rounded-full shadow-lg tracking-wide">
          Experience
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

      <div className="space-y-14">
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          const logoSrc = `/assets/logos/${exp.slug}-logo.png`;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative border-l-4 border-orange-500 pl-6 sm:pl-10 ${
                isEven ? 'ml-0' : 'ml-8 sm:ml-24'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[11px] top-1 w-4 h-4 bg-white dark:bg-gray-900 border-4 border-orange-500 rounded-full shadow-md" />

              {/* Bubble Content */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm bg-white/70 dark:bg-gray-800/60">
                {/* Header */}
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={logoSrc}
                    alt={`${exp.company} logo`}
                    className="w-12 h-12 object-contain rounded"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {exp.role}
                    </h2>
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                      {exp.company} &middot; {exp.year}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </p>

                {/* Tech Stack */}
                {exp.stack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-100 dark:bg-orange-600/80 text-orange-800 dark:text-white text-xs font-semibold px-3 py-1 rounded-full hover:scale-105 transition-transform"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* More Details */}
                <div className="mt-5 text-right">
                  <Link
                    to={`/experience/${exp.slug}`}
                    className="inline-block text-sm font-medium px-4 py-1 border border-orange-400 dark:border-orange-500 rounded-full backdrop-blur-md bg-orange-50/30 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 hover:bg-orange-100/50 dark:hover:bg-orange-600/20 transition-all duration-300"
                  >
                    More details →
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
