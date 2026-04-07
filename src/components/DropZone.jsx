import { useRef, useState } from 'react';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg'];

export default function DropZone({ onFile, onError }) {
  const inputRef = useRef(null);
  const [active, setActive] = useState(false);

  function handleFile(file) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      onError('Nieobsługiwany format — użyj PNG lub JPG');
      return;
    }
    onFile(file);
  }

  function onDragOver(e) {
    e.preventDefault();
    setActive(true);
  }

  function onDragLeave() {
    setActive(false);
  }

  function onDrop(e) {
    e.preventDefault();
    setActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onChange(e) {
    const file = e.target.files[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  return (
    <div
      className={`dropzone${active ? ' dropzone--active' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => inputRef.current.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <p>Przeciągnij screenshot lub kliknij</p>
      <span>PNG lub JPG</span>
    </div>
  );
}
