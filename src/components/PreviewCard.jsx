import { useEffect, useState } from 'react';

export default function PreviewCard({ item }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(item.blob);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [item.blob]);

  const isError = item.warning === 'upscale_4x';
  const isWarn = item.warning === 'upscale_2x';

  return (
    <div className={`preview-card${isError ? ' preview-card--error' : isWarn ? ' preview-card--warn' : ''}`}>
      {url && <img src={url} alt={item.variant} />}
      <div className="preview-card__label">
        <strong>{item.variant}</strong>
        <span>{item.width}×{item.height}</span>
        {isError && <span className="badge badge--error">za mały</span>}
        {isWarn && <span className="badge badge--warn">upscale</span>}
      </div>
    </div>
  );
}
