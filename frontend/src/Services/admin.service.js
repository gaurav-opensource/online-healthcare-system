



import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

const token = localStorage.getItem('token');

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const getProfile = async () => {
  const res = await axios.get(`${API_URL}/profile`, config);
  return res.data;
};

const getUnverifiedDoctors = async () => {
  // Assuming unverified doctors api is separate (check backend routes)
  const res = await axios.get('http://localhost:5000/api/doctors/unverified', config);
  return res.data;
};

const verifyDoctor = async (doctorId) => {
  const res = await axios.put(`${API_URL}/verify-doctor/${doctorId}`, {}, config);
  return res.data;
};

const adminService = {
  getProfile,
  getUnverifiedDoctors,
  verifyDoctor,
};

export default adminService;
