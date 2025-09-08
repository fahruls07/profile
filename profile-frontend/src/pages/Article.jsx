import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';
import { logInfo, logError } from '@/utils/logger';

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    logInfo('[API] fetching /api/articles ...');
    axios.get('/api/articles')
      .then((res) => {
        setArticles(res.data || []);
        logInfo('[API] /api/articles OK, articles:', res.data?.length || 0);
      })
      .catch((err) => {
        logError('[API] /api/articles FAILED:', err.message);
      });
  }, []);

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 relative inline-block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Articles
        </span>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mt-2"></div>
      </motion.h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article, idx) => {
            logInfo('[ARTICLE] render:', article.slug);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/70 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FiFileText className="text-orange-500 text-2xl" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {article.title}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">
                  {article.excerpt || article.content?.slice(0, 120) + '...'}
                </p>
                <div className="mt-4">
                  <a
                    href={`/articles/${article.slug}`}
                    className="text-sm font-medium text-orange-600 hover:text-orange-400 transition"
                  >
                    Read More →
                  </a>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            No articles available yet.
          </p>
        )}
      </div>
    </div>
  );
}
