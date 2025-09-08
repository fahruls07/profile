import { motion } from 'framer-motion';
import { resolveImagePath } from '@/utils/resolveImagePath';
import { imageFallbackHandler } from '@/utils/imageFallbackHandler';
import { logInfo, logWarn } from '@/utils/logger';

export default function ProfileCard({ profile }) {
  const profileImg = resolveImagePath(profile.image || 'profile');
  logInfo('[PROFILE CARD] render profile:', profile.name, '→ image path:', profileImg);

  return (
    <motion.div
      className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={profileImg}
        alt="Profile"
        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-orange-400 shadow-md"
        onError={(e) => {
          logWarn('[IMG] gagal load profile image:', profileImg);
          imageFallbackHandler(e);
        }}
      />
      <div className="text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
        <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">{profile.title}</p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{profile.bio}</p>
      </div>
    </motion.div>
  );
}
