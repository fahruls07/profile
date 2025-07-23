import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Contact from './pages/Contact';
import ExperienceDetail from './pages/ExperienceDetail';

export default function App() {
  return (
    <BrowserRouter>
      <div
        className="
          min-h-screen
          bg-cover bg-center bg-no-repeat
          transition-colors duration-500
          text-black dark:text-white
          bg-[url('/images/bg-light.png')]
          dark:bg-[url('/images/bg-dark.png')]
        "
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/experience/:slug" element={<ExperienceDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
