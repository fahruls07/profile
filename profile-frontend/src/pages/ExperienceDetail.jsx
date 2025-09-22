import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { resolveImagePath } from '@/utils/resolveImagePath';
import { imageFallbackHandler } from '@/utils/imageFallbackHandler';
import { logInfo, logError, logWarn } from '@/utils/logger';

export default function ExperienceDetail() {
  const { slug } = useParams();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    logInfo(`[API] fetching /api/experience/${slug} ...`);
    axios.get(`/api/experience/${slug}`)
      .then(res => {
        setExperience(res.data || null);
        logInfo('[API] /api/experience OK, detail:', slug);
      })
      .catch(err => {
        logError(`[API] /api/experience/${slug} FAILED:`, err.message);
        setExperience(null);
      });
  }, [slug]);

  if (!experience) {
    return <p className="text-center py-10">Experience not found.</p>;
  }

  const logoSrc = resolveImagePath(`logo/${experience.slug}`);
  logInfo('[EXPERIENCE DETAIL] render:', experience.slug, '→ logo path:', logoSrc);

  return (
    <div className="px-4 sm:px-6 py-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-6 mb-6">
          <img
            src={logoSrc}
            alt={`${experience.company} logo`}
            className="w-16 h-16 object-contain rounded"
            onError={(e) => {
              logWarn('[IMG] gagal load logo experience detail:', logoSrc);
              imageFallbackHandler(e);
            }}
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{experience.role}</h1>
            <p className="text-orange-600 dark:text-orange-400 font-medium">
              {experience.company} &middot; {experience.year}
            </p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line leading-relaxed">
          {experience.description}
        </p>

        {experience.stack?.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tech Stack:</h3>
            <div className="flex flex-wrap gap-2">
              {experience.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-orange-100 dark:bg-orange-600/80 text-orange-800 dark:text-white text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link
          to="/experience"
          className="inline-block mt-4 text-sm font-medium px-4 py-1 border border-orange-400 dark:border-orange-500 rounded-full bg-orange-50/30 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 hover:bg-orange-100/50 dark:hover:bg-orange-600/20 transition-all duration-300"
        >
          ← Back to Experience
        </Link>
      </motion.div>
    </div>
  );
}
