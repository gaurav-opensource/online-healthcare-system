

import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  TextField, Button, Typography, Box, Alert, MenuItem, CircularProgress
} from '@mui/material';

const roleOptions = [
  { value: 'user', label: 'User' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'admin', label: 'Admin' },
];

const specializations = [
  'Cardiology', 'General Physician', 'Orthopedics',
  'Pediatrics', 'Neurology', 'Dermatology', 'Other',
];

const SignupPage = () => {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', location: '',
    phoneNumber: '', licenseNumber: '', fees: '', specialization: '',
  });

  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [certificationFile, setCertificationFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const alertRef = useRef();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'profilePhoto') setProfilePhotoFile(files[0]);
    if (name === 'certification') setCertificationFile(files[0]);
  };

  const uploadToCloudinary = async (file, type = 'image') => {
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'ml_default');
      data.append('cloud_name', 'dznnyaj0z');
      data.append('folder', 'Healthcare');

      const url =
        type === 'image'
          ? 'https://api.cloudinary.com/v1_1/dznnyaj0z/image/upload'
          : 'https://api.cloudinary.com/v1_1/dznnyaj0z/raw/upload';

      const res = await axios.post(url, data);
      return res.data.secure_url;
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      throw new Error('File upload failed. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    let endpoint = role === 'user'
      ? '/users/register'
      : role === 'doctor'
        ? '/doctors/register'
        : '/admin/register';

    try {
      let profilePhotoURL = '';
      let certificationURL = '';

      // 🧠 Doctor file check
      if (role === 'doctor') {
        if (!profilePhotoFile || !certificationFile) {
          setError('Both profile photo and certification are required.');
          setLoading(false);
          return;
        }

        profilePhotoURL = await uploadToCloudinary(profilePhotoFile, 'image');
        certificationURL = await uploadToCloudinary(certificationFile, 'raw');
      }

      // 🎯 Final payload
      let payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      if (role === 'user') {
        payload.location = formData.location;
        payload.phoneNumber = formData.phoneNumber;
      } else if (role === 'doctor') {
        payload = {
          ...payload,
          location: formData.location,
          phoneNumber: formData.phoneNumber,
          licenseNumber: formData.licenseNumber,
          fees: formData.fees,
          specialization: formData.specialization,
          profilePhoto: profilePhotoURL,
          certification: certificationURL,
        };
      }

      const res = await axios.post(`http://localhost:5000/api${endpoint}`, payload);
      setSuccess(res.data.message || 'Signup successful! Please log in.');

      // 🧹 Reset
      setFormData({
        name: '', email: '', password: '', location: '',
        phoneNumber: '', licenseNumber: '', fees: '', specialization: '',
      });
      setProfilePhotoFile(null);
      setCertificationFile(null);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center">Sign Up</Typography>

      <TextField
        select label="Role" name="role" value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth margin="normal"
      >
        {roleOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </TextField>

      <div ref={alertRef}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      </div>

      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth required margin="normal" />
        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth required margin="normal" />
        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth required margin="normal" />

        {(role === 'user' || role === 'doctor') && (
          <>
            <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth required margin="normal" />
            <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} fullWidth margin="normal" placeholder="+1234567890" />
          </>
        )}

        {role === 'doctor' && (
          <>
            <TextField label="License Number" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} fullWidth required margin="normal" />
            <TextField label="Fees" name="fees" type="number" value={formData.fees} onChange={handleChange} fullWidth required margin="normal" inputProps={{ min: 1 }} />
            <TextField select label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} fullWidth required margin="normal">
              {specializations.map(spec => (
                <MenuItem key={spec} value={spec}>{spec}</MenuItem>
              ))}
            </TextField>

            <Box sx={{ mt: 2 }}>
              <Typography>Profile Photo (Image file)</Typography>
              <input type="file" name="profilePhoto" accept="image/*" onChange={handleFileChange} required />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography>Certification (PDF file)</Typography>
              <input type="file" name="certification" accept="application/pdf" onChange={handleFileChange} required />
            </Box>
          </>
        )}

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
        </Button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a>
      </p>
    </Box>
  );
};

export default SignupPage;
