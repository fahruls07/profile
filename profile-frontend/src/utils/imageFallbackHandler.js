// utils/imageFallbackHandler.js

export function imageFallbackHandler(e) {
  const currentSrc = e.currentTarget.src;

  if (currentSrc.endsWith('.jpg')) {
    e.currentTarget.src = currentSrc.replace('.jpg', '.png');
  } else if (currentSrc.endsWith('.png')) {
    e.currentTarget.src = currentSrc.replace('.png', '.jpeg');
  } else if (currentSrc.endsWith('.jpeg')) {
    e.currentTarget.src = currentSrc.replace('.jpeg', '.webp');
  } else if (currentSrc.endsWith('.webp')) {
    e.currentTarget.src = currentSrc.replace('.webp', '.gif');
  } else {
    e.currentTarget.style.display = 'none'; // kalau semua gagal → hide
  }
}