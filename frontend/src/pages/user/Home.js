import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import aboutImage from '../../assert/uHome.png';

const UserHome = () => {
  const navigate = useNavigate();

  const handleFindDoctor = () => {
    navigate("/doctorlist");
  };

  const features = [
    {
      title: "Search Doctors",
      desc: "Find and filter medical professionals by specialization, location, or availability.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          <path d="M12 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-2-3c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1z" />
        </svg>
      ),
    },
    {
      title: "Book Appointments",
      desc: "Effortlessly schedule your next visit with our intuitive and fast booking system.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 12h-3v-2h3V7h-3V5.5h3c1.38 0 2.5 1.12 2.5 2.5v4c0 1.38-1.12 2.5-2.5 2.5h-3c-1.38 0-2.5-1.12-2.5-2.5V8c0-1.38 1.12-2.5 2.5-2.5h3c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5h-3c-.83 0-1.5-.67-1.5-1.5V11h-2v1.5c0 1.38 1.12 2.5 2.5 2.5h3c1.38 0 2.5-1.12 2.5-2.5V8c0-1.38-1.12-2.5-2.5-2.5h-3V4h3c1.38 0 2.5 1.12 2.5 2.5v4c0 1.38-1.12 2.5-2.5 2.5h-3c-1.38 0-2.5-1.12-2.5-2.5V8c0-1.38 1.12-2.5 2.5-2.5h3c.83 0 1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5H17V12z" />
          <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 20V4h10v16H7z" />
        </svg>
      ),
    },
    {
      title: "Upload Reports",
      desc: "Securely upload and share your diagnostic reports and medical files with your doctor.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 9V4.5L18.5 11H13zm4.5 9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-5-3h-3.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5H12c.28 0 .5.22.5.5s-.22.5-.5.5zm0-2h-3.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5H12c.28 0 .5.22.5.5s-.22.5-.5.5zm0-2h-3.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5H12c.28 0 .5.22.5.5s-.22.5-.5.5z" />
        </svg>
      ),
    },
    {
      title: "Chat & Video Call",
      desc: "Connect with your doctor for virtual consultations and instant support via secure chat or video.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-teal-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 6.5l-5-3V7l5 3zm-14-3L2 6.5V17l5 3.5V17c0-2.21 1.79-4 4-4h4V9H9zm5 8v2h-2v-2h2zm2-2.5v5h-2v-5h2z" />
        </svg>
      ),
    },
    {
      title: "Health Progress Tracker",
      desc: "Monitor your health journey with smart graphs and insightful logs to stay on track.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 14h1.5v-1c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1h-1.5v1H15v1.5h-1v-1h-1.5v1c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1V15H9v-1.5H7.5V12H9v-1.5h1.5V9H12v1.5h1.5V12H15v-1.5H16.5V12H18v1.5h-1.5V14z" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      ),
    },
    {
      title: "Prescription History",
      desc: "Access your complete history of prescriptions and recommendations at any time.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden min-h-[80vh] bg-gradient-to-r from-blue-50 to-white flex items-center pt-24 pb-12">
        {/* Blue heartbeat line effect */}
        <svg className="absolute top-0 left-0 w-full h-full z-0 opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            d="M-10,50 Q20,30 40,50 T80,50 T110,50" 
            stroke="#0ea5e9" 
            strokeWidth="1.5" 
            fill="none" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
          />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10 flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-12">
          {/* Content Column */}
          <div className="flex-1 lg:w-1/2">
            <span className="inline-block bg-teal-100 text-teal-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="mr-2">🩺</span> Healthy everyday!
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight md:leading-snug">
              Get a professional <br className="hidden md:block" /> diagnosis in your <br className="hidden md:block" /> neighborhood
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
              Leading experts in all major fields are just around the corner. Book your appointment today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
              <motion.button 
                onClick={handleFindDoctor}
                className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book an appointment
              </motion.button>
              <motion.button 
                className="bg-white text-blue-600 border border-blue-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn more
              </motion.button>
            </div>
          </div>

          {/* Image and Cards Column */}
          <div className="flex-1 lg:w-1/2 relative mt-8 lg:mt-0 flex items-center justify-center">
            <img src={aboutImage} alt="A smiling doctor with a stethoscope" className="w-full h-auto object-contain rounded-xl shadow-2xl" />
            
            {/* Cards over the image */}
            <div className="absolute bottom-8 -right-16 hidden lg:block">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-xl p-4 flex items-center space-x-4 w-64 transform -rotate-6 translate-x-12">
                <img src="https://placehold.co/50x50/cccccc/333333?text=JG" alt="Dr. Jared Giel" className="w-12 h-12 rounded-full border border-gray-200" />
                <div>
                  <h3 className="font-semibold text-gray-800">Dr. Jared Giel</h3>
                  <p className="text-xs text-gray-500">Laryngologist</p>
                </div>
              </div>
            </div>

            <div className="absolute top-1/3 -right-20 hidden lg:block">
              {/* Call Center Card */}
              <div className="bg-white rounded-xl shadow-xl p-4 flex items-center space-x-4 w-64 transform -rotate-3">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">24/7 Call Center</p>
                  <p className="text-xs text-gray-500">Available now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 md:px-16 bg-white shadow-inner">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Your Smart Healthcare Tools
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 transform hover:translate-y-[-5px]"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* QUICK LINKS SECTION */}
      <section className="py-16 px-6 md:px-16 bg-gradient-to-b from-white to-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-blue-600 text-white rounded-3xl shadow-xl p-8 flex flex-col justify-center items-center text-center transform hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-bold mb-4">View Your Appointments</h3>
            <p className="mb-6 opacity-90">
              See your upcoming and past appointments at a glance.
            </p>
            <button
              onClick={() => navigate("/user/appointments")}
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              Go to Appointments
            </button>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-indigo-600 text-white rounded-3xl shadow-xl p-8 flex flex-col justify-center items-center text-center transform hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-bold mb-4">Access Health Records</h3>
            <p className="mb-6 opacity-90">
              Securely view and manage all your health documents and reports.
            </p>
            <button
              onClick={() => navigate("/user/reports")}
              className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
            >
              View Records
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="text-center py-8 text-sm text-gray-500 bg-white shadow-inner">
        © 2025 HealthMate
      </div>
    </div>
  );
};

export default UserHome;
