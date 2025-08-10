import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UploadTestReport from './UploadTestReport';
import BASE_URL from '../../../src/apiConfig';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndAppointments = async () => {
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile
        const userRes = await axios.get(`${BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userRes.data);

        const userId = userRes.data.id || userRes.data.user?.id;
        if (!userId) throw new Error('User ID not found');

        // Fetch user appointments
        const appointmentsRes = await axios.get(
          `${BASE_URL}/appointments/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Filter only completed appointments
        const completedAppointments = appointmentsRes.data.filter(
          (appt) => appt.isCompleted === true
        );

        setAppointments(completedAppointments);
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndAppointments();
  }, [token]);

  const handleJoinCall = (roomId) => {
    navigate(`/video-call/${roomId}`);
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-10 text-lg">Loading user profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10 text-lg">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">User Profile</h2>

        <div className="space-y-4 text-lg text-gray-700">
          <p><span className="font-semibold">👤 Name:</span> {user.name}</p>
          <p><span className="font-semibold">📧 Email:</span> {user.email}</p>
          <p><span className="font-semibold">📱 Phone:</span> {user.phoneNumber || 'Not provided'}</p>
          <p><span className="font-semibold">📍 Location:</span> {user.location || 'Not provided'}</p>
          <p><span className="font-semibold">🛡️ Role:</span> {user.role}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Your Completed Appointments</h3>
          {appointments.length > 0 ? (
            <ul className="space-y-6">
              {appointments.map((appointment) => (
                <li key={appointment._id} className="border p-4 rounded-lg shadow-sm">
                  <p><span className="font-semibold">👨‍⚕️ Doctor Name:</span> {appointment.doctor?.name || 'N/A'}</p>
                  <p><span className="font-semibold">📍 Location:</span> {appointment.doctor?.location || 'N/A'}</p>
                  <p><span className="font-semibold">📅 Date:</span> {new Date(appointment.date).toLocaleDateString()}</p>
                  <p><span className="font-semibold">⏰ Time:</span> {appointment.time}</p>
                  <p><span className="font-semibold">🩺 Specialization:</span> {appointment.doctor?.specialization || 'N/A'}</p>

                  {/* Upload / View Test Report */}
                  {appointment.test ? (
                    <a
                      href={`${BASE_URL}${appointment.test}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-700 underline mt-2 block"
                    >
                      🧾 View Uploaded Report
                    </a>
                  ) : (
                    <UploadTestReport
                      appointmentId={appointment._id}
                      onUploadSuccess={() => window.location.reload()}
                    />
                  )}

                  {appointment.prescription ? (
                    <a
                      href={appointment.prescription}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-700 underline mt-2 block"
                    >
                      🧾 View Uploaded Test Report
                    </a>
                  ) : (
                    <p className="text-gray-500 italic">No test report uploaded yet.</p>
                  )}

                  {/* Join Video Call Button */}
                  {appointment.roomId && (
                    <button
                      onClick={() => handleJoinCall(appointment.roomId)}
                      className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                      🎥 Join Video Call
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No completed appointments found.</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Ready to book an appointment?{' '}
            <a href="/appointment" className="text-indigo-600 font-medium hover:underline">
              Click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
