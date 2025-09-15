import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Contact from './pages/Contact';
import ExperienceDetail from './pages/ExperienceDetail';
import ListApi from './pages/ListApi';
import { ENABLE_LIST_API } from './config';

const bgLight = `${import.meta.env.VITE_BACKGROUND_PATH || '/assets/background/'}bg-light.png`;
const bgDark = `${import.meta.env.VITE_BACKGROUND_PATH || '/assets/background/'}bg-dark.png`;

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Cek dark mode dari class html
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <BrowserRouter>
      <div
        className="
          min-h-screen
          flex flex-col
          bg-cover bg-center bg-no-repeat
          transition-colors duration-500
          text-black dark:text-white
        "
        style={{
          backgroundImage: `url(${isDark ? bgDark : bgLight})`,
        }}
      >
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/experience/:slug" element={<ExperienceDetail />} />
            <Route path="/list-api" element={<ListApi />} />
            
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}