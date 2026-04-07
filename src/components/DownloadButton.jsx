import { downloadAsZip } from '../utils/zipper.js';

export default function DownloadButton({ variants }) {
  const hasVariants = variants && variants.length > 0;

  async function handleClick() {
    await downloadAsZip(variants);
  }

  return (
    <button
      className="download-btn"
      onClick={handleClick}
      disabled={!hasVariants}
    >
      Pobierz wszystko (.zip)
    </button>
  );
}
