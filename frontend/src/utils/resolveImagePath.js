const extensions = ['webp', 'png', 'jpg', 'jpeg', 'gif'];

export function resolveImagePath(filename) {
  if (/\.(png|jpe?g|webp|gif)$/i.test(filename)) {
    return filename.startsWith('/') ? filename : `/${filename}`;
  }

  // Jika hanya nama tanpa ekstensi
  for (const ext of extensions) {
    if (filename.startsWith('banner/')) {
      return `/banner/${filename}.${ext}`;
    }

    if (filename === 'profile') {
      return `/profile.${ext}`;
    }
  }

  // Fallback terakhir
  return '/default.jpg';
}