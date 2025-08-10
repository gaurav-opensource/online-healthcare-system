import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Correct the image import path and add extension as needed (e.g., .png)
import heroImage from '../../../src/assert/userHome.png'; 

const features = [
  {
    title: "Search Doctors",
    desc: "Find doctors by specialization, location, or availability.",
    icon: "https://cdn-icons-png.flaticon.com/512/1055/1055644.png",
  },
  {
    title: "Book Appointments",
    desc: "Easily schedule appointments with just a few clicks.",
    icon: "https://cdn-icons-png.flaticon.com/512/2921/2921222.png",
  },
  {
    title: "Upload Reports",
    desc: "Securely upload and share your lab reports and files.",
    icon: "https://cdn-icons-png.flaticon.com/512/3602/3602123.png",
  },
  {
    title: "Chat & Video Call",
    desc: "Connect with your doctor through chat or video calls.",
    icon: "https://cdn-icons-png.flaticon.com/512/2942/2942719.png",
  },
  {
    title: "Health Progress Tracker",
    desc: "Track your health progress with smart graphs and logs.",
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
  },
  {
    title: "Prescription History",
    desc: "Access all your prescriptions and recommendations anytime.",
    icon: "https://cdn-icons-png.flaticon.com/512/1510/1510824.png",
  },
  {
    title: "Medicine Reminders",
    desc: "Get notified when it's time to take your medication.",
    icon: "https://cdn-icons-png.flaticon.com/512/4290/4290854.png",
  },
  {
    title: "Health Tips",
    desc: "Receive daily tips to stay fit and live a healthy life.",
    icon: "https://cdn-icons-png.flaticon.com/512/3659/3659730.png",
  }
];

const UserHome = () => {
  const navigate = useNavigate();

  const handleFindDoctor = () => {
    navigate("/doctorlist");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* HERO SECTION */}
      <div
        className="relative h-[100vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-20 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to HealthMate 🩺
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Book doctors, upload reports, track health & get expert advice — all in one place.
          </p>
          <button
            onClick={handleFindDoctor}
            className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl shadow-xl text-lg transition-all"
          >
            🔍 Find a Doctor
          </button>
        </motion.div>
      </div>

      {/* FEATURES SECTION */}
      <section className="py-16 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Your Smart Healthcare Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all text-center"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 HealthMate — Stay healthy, stay connected.
      </footer>
    </div>
  );
};

export default UserHome;
