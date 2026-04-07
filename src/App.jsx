import { useState } from 'react';
import DropZone from './components/DropZone.jsx';
import PreviewGrid from './components/PreviewGrid.jsx';
import ErrorBanner from './components/ErrorBanner.jsx';
import DownloadButton from './components/DownloadButton.jsx';
import { resizeToAllVariants } from './utils/resizer.js';

export default function App() {
  const [variants, setVariants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(file) {
    setError(null);
    setVariants([]);
    setLoading(true);
    try {
      const result = await resizeToAllVariants(file);
      const hardErrors = result.filter(v => v.warning === 'upscale_4x');
      if (hardErrors.length > 0) {
        setError(`Obraz za mały — wymagany upscale ${Math.round(Math.max(...hardErrors.map(v => Math.max(v.width / 1, v.height / 1))))}x. Użyj obrazu co najmniej 1242×2208 px.`);
        setLoading(false);
        return;
      }
      setVariants(result);
    } catch (e) {
      setError('Błąd podczas przetwarzania obrazu.');
    }
    setLoading(false);
  }

  function handleError(msg) {
    setError(msg);
    setVariants([]);
  }

  const warnings = variants.filter(v => v.warning === 'upscale_2x');

  return (
    <div className="app">
      <header className="app__header">
        <h1>App Store Assets</h1>
        <p>Wrzuć screenshot — dostaniesz 9 wariantów dla App Store i Google Play</p>
      </header>
      <main className="app__main">
        <DropZone onFile={handleFile} onError={handleError} />
        <ErrorBanner message={error} type="error" />
        {warnings.length > 0 && (
          <ErrorBanner
            message={`Uwaga: ${warnings.length} wariantów wymaga upscalingu >2x — jakość może być obniżona.`}
            type="warn"
          />
        )}
        {loading && <p className="loading">Przetwarzanie...</p>}
        {variants.length > 0 && (
          <>
            <DownloadButton variants={variants} />
            <PreviewGrid variants={variants} />
          </>
        )}
      </main>
    </div>
  );
}
