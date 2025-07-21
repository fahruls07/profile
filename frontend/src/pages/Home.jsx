import { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard';
import HeaderBanner from '../components/HeaderBanner';

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('/api/profile').then(res => setProfile(res.data));
  }, []);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="px-6 py-6 space-y-8 max-w-7xl mx-auto">
      <HeaderBanner />
      <ProfileCard profile={profile} />

      <section>
        <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-900 dark:text-white text-center sm:text-left">
          Skills
        </h2>
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
    </div>
  );
}