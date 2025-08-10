

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import BASE_URL from '../../src/apiConfig';// backend base URL

const DoctorProfilePage = () => {
  const [doctor, setDoctor] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token found.');
        return;
      }

      try {
        const doctorRes = await axios.get(`${BASE_URL}/doctors/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDoctor(doctorRes.data);

        const doctorId = doctorRes.data._id || doctorRes.data.id || doctorRes.data.user?.id;
        const ratingRes = await axios.get(`${BASE_URL}/ratings/doctor/${doctorId}`);
        setRatings(ratingRes.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
        }
      }
    };

    fetchDoctorProfile();
  }, [navigate]);

  if (!doctor) {
    return (
      <div className="min-h-screen overflow-y-scroll bg-gradient-to-br from-teal-50 to-blue-100 flex items-center justify-center p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-teal-700 font-medium">Loading Doctor Profile...</p>
        </div>
      </div>
    );
  }

  const photoUrl =
    doctor.profilePhoto && !imageError
      ? doctor.profilePhoto
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans pt-16">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row w-full">
        {/* Left Section */}
        <div className="relative w-full lg:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex flex-col items-center justify-center text-white text-center rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
          <div className="absolute top-6 left-6 bg-yellow-300 p-3 rounded-full shadow-lg">
            <svg className="w-7 h-7 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a3 3 0 00-3 3v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-2V5a3 3 0 00-3-3zm-1 5V5a1 1 0 112 0v2h-2z" />
            </svg>
          </div>
          <div className="w-36 h-36 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-6 border-white shadow-2xl mb-6 mt-10 lg:mt-0 flex items-center justify-center">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Doctor"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-blue-100 flex items-center justify-center text-6xl text-blue-600 font-bold uppercase">
                {doctor.name.charAt(0)}
              </div>
            )}
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-2">{`Dr. ${doctor.name.toUpperCase()}`}</h2>
          <p className="text-xl opacity-90 mb-1">{doctor.specialization || 'Specialist'}</p>
          <p className="text-base opacity-80">{doctor.location || 'Unknown Location'}</p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-2/3 p-8 sm:p-10 lg:p-12 overflow-y-auto max-h-screen">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-blue-200 pb-3">
            PROFILE DETAILS
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ProfileCard label="Name" value={`Dr. ${doctor.name}`} />
            <ProfileCard label="Specialization" value={doctor.specialization} />
            <ProfileCard label="Email" value={doctor.email} />
            <ProfileCard label="Phone" value={doctor.phoneNumber} />
            <ProfileCard label="Location" value={doctor.location} />
            <ProfileCard label="Consultation Fees" value={`₹${doctor.fees}`} color="green" />
            <ProfileCard label="Experience" value={doctor.experience} />
            <ProfileCard label="Rating" value={doctor.rating ? `${doctor.rating} / 5` : 'N/A'} color="yellow" />
          </div>

          {/* About */}
          <Section title="ABOUT" content={doctor.about} />

          {/* Achievements */}
          <Section title="ACHIEVEMENTS" content={doctor.achievements} />

          {/* Other Info */}
          <Section title="OTHER INFORMATION" content={doctor.other} />

          {doctor.certification && (
            <div className="text-center mb-8">
              <a
                href={doctor.certification}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium underline text-lg"
              >
                View Certification Document
              </a>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 pt-6 border-t-2 border-gray-200">
            <ActionButton text="Edit Profile" color="teal" onClick={() => navigate('/doctor/edit-profile')} />
            {doctor._id && (
              <ActionButton text="Book Appointment" color="green" onClick={() => navigate(`/book-appointment/${doctor._id}`)} />
            )}
          </div>

          {/* Ratings */}
          <div className="pt-10 border-t-2 border-gray-200 mt-10">
            <h3 className="text-3xl font-bold text-blue-700 mb-6 border-b-2 border-blue-200 pb-3">
              Patient Reviews & Ratings
            </h3>
            {ratings.length === 0 ? (
              <p className="text-gray-600 text-lg italic">No ratings yet.</p>
            ) : (
              <div className="space-y-6">
                {ratings.map((rating, index) => (
                  <div key={index} className="bg-blue-50 p-6 rounded-xl shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-blue-800 font-semibold">{rating.user?.name || 'Anonymous'}</p>
                      <div className="flex gap-1 text-xl">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < rating.rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                        ))}
                      </div>
                    </div>
                    {rating.comment && <p className="text-gray-700">{rating.comment}</p>}
                    <p className="text-right text-xs text-gray-500">{new Date(rating.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Subcomponents

const ProfileCard = ({ label, value, color = 'gray' }) => {
  const colors = {
    gray: 'text-gray-800',
    green: 'text-green-700',
    yellow: 'text-yellow-700',
  };
  return (
    <div className="p-5 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
      <p className="text-sm text-gray-500 uppercase font-medium">{label}</p>
      <p className={`text-lg font-medium mt-1 ${colors[color]}`}>{value || 'N/A'}</p>
    </div>
  );
};

const ActionButton = ({ text, onClick, color }) => {
  const colorClasses = {
    teal: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
  };
  return (
    <button
      onClick={onClick}
      className={`text-white px-6 py-3 rounded-lg ${colorClasses[color]} transform hover:scale-105 transition font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75`}
    >
      {text}
    </button>
  );
};

const Section = ({ title, content }) => (
  <div className="mb-8 p-5 bg-blue-50 rounded-xl shadow-sm">
    <p className="text-sm text-gray-500 uppercase font-semibold mb-1">{title}</p>
    <p className="text-lg text-gray-800">{content || 'No information provided.'}</p>
  </div>
);

export default DoctorProfilePage;
