import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../../src/apiConfig'; 
// Main PaymentPage component
const PaymentPage = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);

  // Extracting appointment details from URL query parameters
  const doctorId = query.get('doctorId');
  const userId = query.get('userId');
  const appointmentDate = query.get('appointmentDate');
  const description = query.get('description');
  const amount = query.get('amount'); // This is a string, might need parsing if used in calculations

  // Base URL for API calls (assuming it's consistent across components)


  const handlePaymentSubmit = async () => {
    try {
      // Basic validation for demonstration
      if (!doctorId || !userId || !appointmentDate || !description || !amount) {
        console.error('Missing appointment details for payment.');
        // In a real application, you'd show a user-friendly error message
        return;
      }

      // API call to create the appointment after "payment"
      const res = await axios.post(`${BASE_URL}/appointments`, {
        userId,
        doctorId,
        appointmentDate,
        description,
        amount: parseFloat(amount), // Ensure amount is a number if your API expects it
      });

      console.log('Payment & Appointment Successful!', res.data); // Log success
      // In a real app, you might show a success modal instead of alert
      // alert('Payment & Appointment Successful!');
      navigate('/user/home'); // redirect to dashboard or tracker
    } catch (err) {
      console.error('Payment failed:', err.response ? err.response.data : err.message); // Log detailed error
      // In a real app, you'd show a user-friendly error message
      // alert('Payment failed');
    }
  };

  return (
    // Outer container for the full-page background
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
      {/* Main payment card container with consistent styling */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md p-8 relative transform hover:scale-[1.01] transition-transform duration-300 ease-in-out mx-auto mt-16 px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
          <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
        </div>

        <div className="space-y-4 text-center">
          <p className="text-lg text-gray-700">
            You are about to book an appointment with a doctor.
          </p>
          <p className="text-xl font-bold text-blue-700">
            Amount to Pay: <span className="text-green-600">₹{amount || 'N/A'}</span>
          </p>
          <p className="text-sm text-gray-500">
            Please confirm to proceed with the payment and book your appointment.
          </p>
        </div>

        {/* Pay & Confirm Appointment Button */}
        <button
          onClick={handlePaymentSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-lg font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-8"
        >
          Pay & Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
