import PreviewCard from './PreviewCard.jsx';

export default function PreviewGrid({ variants }) {
  const appstore = variants.filter(v => v.store === 'appstore');
  const googleplay = variants.filter(v => v.store === 'googleplay');

  return (
    <div className="preview-grid">
      <section>
        <h2>App Store</h2>
        <div className="preview-grid__row">
          {appstore.map(item => (
            <PreviewCard key={`${item.store}-${item.variant}`} item={item} />
          ))}
        </div>
      </section>
      <section>
        <h2>Google Play</h2>
        <div className="preview-grid__row">
          {googleplay.map(item => (
            <PreviewCard key={`${item.store}-${item.variant}`} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
