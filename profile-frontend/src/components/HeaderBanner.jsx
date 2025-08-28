import { useEffect, useState, useRef } from 'react';
import { resolveImagePath } from '../utils/resolveImagePath';

const bannerList = ['banner1', 'banner2', 'banner3'];
const pauseDuration = 5000; // durasi per slide (ms) → 5000 = 5 detik

export default function HeaderBanner() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % bannerList.length);
    }, pauseDuration);

    return () => resetTimeout();
  }, [current]);

  const goToSlide = (index) => setCurrent(index);
  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + bannerList.length) % bannerList.length);
  const goNext = () =>
    setCurrent((prev) => (prev + 1) % bannerList.length);

  return (
    <div
      className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-xl shadow-md"
      onMouseEnter={resetTimeout}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => {
          setCurrent((prev) => (prev + 1) % bannerList.length);
        }, pauseDuration);
      }}
    >
      {bannerList.map((banner, index) => (
        <img
          key={index}
          src={resolveImagePath(`banner/${banner}`)}
          alt={`Banner ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}

      {/* Tombol Prev */}
      <button
        onClick={goPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white text-xl sm:text-2xl p-2 rounded-full hover:bg-black/60 transition z-20"
      >
        ‹
      </button>

      {/* Tombol Next */}
      <button
        onClick={goNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white text-xl sm:text-2xl p-2 rounded-full hover:bg-black/60 transition z-20"
      >
        ›
      </button>

      {/* Manual selector (bulatan bawah) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {bannerList.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === current
                ? 'bg-orange-500'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
