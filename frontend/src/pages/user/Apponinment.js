import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Main AppointmentForm component
const AppointmentForm = () => {
  const { doctorId } = useParams();
  const [appointmentDate, setAppointmentDate] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // stored after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (optional, can be expanded)
    if (!appointmentDate || !description) {
      console.error('Please fill in all fields.');
      // In a real app, you'd show a user-friendly error message here (e.g., a modal)
      return;
    }

    // Send details to payment page instead of creating appointment directly
    // Using console.log instead of alert for demonstration
    console.log('Navigating to payment with:', {
      doctorId,
      userId,
      appointmentDate,
      description,
      amount: 500
    });

    navigate(`/user/payment?doctorId=${doctorId}&userId=${userId}&appointmentDate=${appointmentDate}&description=${description}&amount=500`);
  };

  return (
    // Outer container for the full-page background
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      {/* Main form card container with consistent styling */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md p-8 relative transform hover:scale-[1.01] transition-transform duration-300 ease-in-out mx-auto mt-16 px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Header */}
        <div className="flex items-center justify-center mb-8">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
          <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date & Time Input */}
          <div>
            <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time:
            </label>
            <FormInput
              id="appointmentDate"
              type="datetime-local"
              name="appointmentDate"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4" // Added rows for better textarea appearance
              className="appearance-none relative block w-full px-3 py-2 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200 resize-y rounded-md" // Added rounded-md for textarea
            />
          </div>

          {/* Proceed to Payment Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable Form Input Component (for consistency with registration form)
const FormInput = ({ id, type, name, value, onChange, placeholder, required }) => (
  <input
    id={id}
    name={name}
    type={type}
    required={required}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="appearance-none relative block w-full px-3 py-2 border-b-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors duration-200"
  />
);

export default AppointmentForm;
