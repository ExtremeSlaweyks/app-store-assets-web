import { readAndCompressImage } from 'browser-image-resizer';
import { STORE_SIZES } from '../config/store-sizes.js';

function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = url;
  });
}

function getWarning(ratio) {
  if (ratio > 4) return 'upscale_4x';
  if (ratio > 2) return 'upscale_2x';
  return null;
}

export async function resizeToAllVariants(file) {
  const { width: srcWidth, height: srcHeight } = await getImageDimensions(file);

  const variants = [
    ...STORE_SIZES.appstore.map(v => ({ store: 'appstore', ...v })),
    ...STORE_SIZES.googleplay.map(v => ({ store: 'googleplay', ...v })),
  ];

  return Promise.all(
    variants.map(async ({ store, name, width, height }) => {
      const ratio = Math.max(width / srcWidth, height / srcHeight);
      const warning = getWarning(ratio);
      const blob = await readAndCompressImage(file, {
        maxWidth: width,
        maxHeight: height,
        quality: 1,
        mimeType: 'image/png',
      });
      return { store, variant: name, width, height, blob, warning };
    })
  );
}
