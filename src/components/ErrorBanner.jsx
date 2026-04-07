export default function ErrorBanner({ message, type = 'error' }) {
  if (!message) return null;
  return (
    <div className={`error-banner error-banner--${type}`}>
      {message}
    </div>
  );
}
