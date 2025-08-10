import React, { useState } from 'react';
import axios from 'axios';

const TestUpload = () => {
  const [photo, setPhoto] = useState(null);
  const [url, setUrl] = useState('');

  const handleUpload = async () => {
    if (!photo) return alert('Please select a file');

    const formData = new FormData();
    formData.append('photo', photo);

    try {
      const res = await axios.post('http://localhost:5000/api/test/upload-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUrl(res.data.url);
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Upload failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Test Cloudinary Upload</h2>
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {url && (
        <div>
          <p>Uploaded Image URL:</p>
          <a href={url} target="_blank" rel="noreferrer">{url}</a>
          <br />
          <img src={url} alt="uploaded" style={{ width: 200, marginTop: 10 }} />
        </div>
      )}
    </div>
  );
};

export default TestUpload;
