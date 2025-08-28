import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard';
import HeaderBanner from '../components/HeaderBanner';
import CareerTimeline from '../components/CareerTimeline';
import Footer from '../components/Footer';

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('/api/profile').then(res => setProfile(res.data));
  }, []);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="px-6 py-6 space-y-12 max-w-7xl mx-auto">
      <HeaderBanner />
      <ProfileCard profile={profile} />

      {/* Skills Section */}
      <section>
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center sm:text-left mb-6 relative inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Skills
          </span>
          <div className="absolute left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mt-2"></div>
        </motion.h2>

        <ul className="flex flex-wrap justify-center sm:justify-start gap-3">
          {profile.skills.map(skill => (
            <li
              key={skill}
              className="bg-orange-100 dark:bg-orange-600 dark:text-white text-orange-700 px-4 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {/* Career Timeline */}
      <section className="mt-20"> 
        <CareerTimeline />
      </section>
    </div>
  );
}
