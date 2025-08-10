import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadPrescription from './UploadPrescription'; // ✅ Make sure the path is correct
import BASE_URL from '../../../src/apiConfig'; 
const PendingAppoinment = () => {
  const [appointments, setAppointments] = useState([]);
 

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      try {
        const token = localStorage.getItem('token');

        const doctorRes = await axios.get(`${BASE_URL}/doctors/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const doctorId =
          doctorRes.data._id ||
          doctorRes.data.user?._id ||
          doctorRes.data.id;

        const appointmentRes = await axios.get(
          `${BASE_URL}/api/appointments/doctor/${doctorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const pending = appointmentRes.data.filter((a) => !a.isCompleted);
        setAppointments(pending);
      } catch (error) {
        console.error('Error fetching pending appointments:', error);
      }
    };

    fetchPendingAppointments();
  }, []);

  return (
    <div className="p-6 mt-20">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-2xl font-bold text-red-700 mb-4">⏳ Pending Appointments</h3>
        {appointments.length > 0 ? (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment._id} className="border p-4 rounded-lg bg-yellow-50">
                <p><strong>👤 User Name:</strong> {appointment.user?.name || 'N/A'}</p>
                <p><strong>📧 Email:</strong> {appointment.user?.email || 'N/A'}</p>
                <p><strong>📅 Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>⏰ Time:</strong> {appointment.time}</p>
                <p><strong>📝 Description:</strong> {appointment.description || 'N/A'}</p>

                {/* ✅ View Test Report */}
                {appointment.testReports ? (
                  <a
                    href={appointment.testReports}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-700 underline mt-2 block"
                  >
                    🧾 View Uploaded Test Report
                  </a>
                ) : (
                  <p className="text-gray-500 italic">No test report uploaded yet.</p>
                )}

                {/* ✅ View Prescription */}
                {appointment.prescription ? (
                  <a
                    href={appointment.prescription}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-700 underline mt-2 block"
                  >
                    💊 View Prescription
                  </a>
                ) : (
                  <p className="text-gray-500 italic">No prescription uploaded yet.</p>
                )}

                {/* ✅ Upload Prescription Button */}
                <UploadPrescription
                  appointmentId={appointment._id}
                  onUploadSuccess={() => window.location.reload()} // reload to see the update
                />

                {/* ✅ Video Call Link */}
                {appointment.roomId ? (
                  <a
                    href={`http://localhost:3000/video-call/${appointment._id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                  >
                    🎥 Join Video Call
                  </a>
                ) : (
                  <p className="text-gray-500 italic mt-2">Room ID not assigned yet.</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">No pending appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default PendingAppoinment;
