// src/services/cloudinary.service.js
import axios from 'axios';

const CLOUD_NAME = 'dznnyaj0z';
const UPLOAD_PRESET = 'ml_default';

export const uploadToCloudinary = async (file, type = 'image') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);
    formData.append('folder', 'Healthcare');

    const url =
      type === 'image'
        ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        : `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`;

    const response = await axios.post(url, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Cloudinary upload failed');
  }
};
