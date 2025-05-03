import { useState } from 'react';

function UploadImage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="p-4 text-white">
      <h2 className="mb-2 text-xl">Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-600 rounded">
        Upload
      </button>
      {imageUrl && (
        <div className="mt-4">
          <p>Image URL:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400">
            {imageUrl}
          </a>
          <img src={imageUrl} alt="Uploaded" className="max-w-xs mt-2 rounded" />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
