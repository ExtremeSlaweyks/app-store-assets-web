import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function downloadAsZip(variants) {
  const zip = new JSZip();

  for (const { store, variant, blob } of variants) {
    zip.folder(store).file(`${variant}.png`, blob);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'app-store-assets.zip');
}
