// utils/resolveImagePath.js
const fallbackExts = ['jpg', 'png', 'jpeg', 'webp', 'gif'];

export function resolveImagePath(filename) {
  const paths = {
    logo: import.meta.env.VITE_LOGO_PATH || '/assets/logos/',
    background: import.meta.env.VITE_BACKGROUND_PATH || '/assets/background/',
    banner: import.meta.env.VITE_BANNER_PATH || '/assets/banner/',
    profile: import.meta.env.VITE_PROFILE_PATH || '/assets/profile/',
  };

  if (!filename) return '/default.jpg';

  // Kalau sudah ada ekstensi valid → langsung return
  if (/\.(png|jpe?g|webp|gif)$/i.test(filename)) {
    return filename.startsWith('/') ? filename : `/${filename}`;
  }

  let folder = '';
  let cleanName = filename;

  if (filename.startsWith('logo/')) {
    folder = paths.logo; cleanName = filename.slice(5);
  } else if (filename.startsWith('background/')) {
    folder = paths.background; cleanName = filename.slice(11);
  } else if (filename.startsWith('banner/')) {
    folder = paths.banner; cleanName = filename.slice(7);
  } else if (filename === 'profile' || filename.startsWith('profile')) {
    folder = paths.profile;
    cleanName = filename.replace(/^profile\/?/, '') || 'profile';
  } else {
    return '/default.jpg';
  }

  // fallback → pakai urutan yang ditentukan
  return `${folder}${cleanName}.${fallbackExts[0]}`;
}
