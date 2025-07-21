import { useEffect, useState, useRef } from 'react';
import { resolveImagePath } from '../utils/resolveImagePath';

const bannerList = [
  'banner1.jpg',
  'banner2.jpg',
  'banner3.jpg',
];

export default function HeaderBanner() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const pauseDuration = 5000;

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

      {/* Manual selector */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {bannerList.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === current ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
