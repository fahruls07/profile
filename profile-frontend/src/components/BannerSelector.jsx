import { useState } from 'react';
import { resolveImagePath } from '../utils/resolveImagePath';

const bannerNames = ['banner1', 'banner2', 'banner3']; // tanpa ekstensi

export default function BannerSelector() {
  const resolvedBanners = bannerNames.map(name => resolveImagePath(`banner/${name}`));
  const [banner, setBanner] = useState(resolvedBanners[0]);

  return (
    <div className="relative">
      <img
        src={banner}
        alt="Banner"
        className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover rounded-xl shadow-sm"
      />
      <div className="absolute bottom-2 right-2 flex gap-2">
        {resolvedBanners.map((b, idx) => (
          <button
            key={idx}
            onClick={() => setBanner(b)}
            className={`w-4 h-4 rounded-full border transition ${
              banner === b ? 'bg-orange-500' : 'bg-white'
            }`}
            title={`Banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
