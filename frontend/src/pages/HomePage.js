import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// Make sure the image path is correct in your project
import homeImg from '../assert/Home.png'; 

export default function HomePage() {
  const boxesRef = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    boxesRef.current.forEach((box) => {
      if (box) observer.observe(box);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    ['🧑‍⚕️', 'Certified Doctors'],
    ['🛡️', 'Secure & Private'],
    ['📞', '24x7 Access'],
    ['📈', 'Health Tracker'],
  ];

  // Fallback image in case homeImg fails to load
  const heroImageFallback = 'https://placehold.co/1920x1080/E0E7FF/4338CA?text=Healthcare+Banner';

  return (
    <div className="flex flex-col min-h-[250vh] font-sans">
      <main className="flex-grow w-full pt-12">

        <section
          className="relative h-[100vh] bg-cover bg-center"
          style={{
            backgroundImage: `url(${homeImg}), url(${heroImageFallback})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundAttachment: 'scroll',
          }}
        >
          {/* Removed blue overlay for clear image */}
          {/* Optional: add a subtle dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-start px-4 sm:px-10 lg:px-20">
            <div className="text-white max-w-xl drop-shadow-lg">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                Healthcare focused <br /> on <span className="text-teal-300">you</span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl mb-8 font-light">
                Consult certified doctors online. Book appointments. <br />
                Track health — anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🩺 Book Appointment
                </Link>
                <Link
                  to="/doctor-register"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  👨‍⚕️ Join as Doctor
                </Link>
                <a
                  href="#why-us"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🔍 Explore Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-us" className="py-16 px-8 text-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
            Why Choose <span className="text-blue-600">AiSmartHealthcare</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map(([icon, title], index) => (
              <div
                key={index}
                ref={(el) => (boxesRef.current[index] = el)}
                data-index={index}
                className={`bg-white p-6 rounded-xl shadow-lg border border-blue-100 transform transition-all duration-700 ease-in-out
                  ${
                    visibleCards.includes(index)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }
                  hover:shadow-xl hover:-translate-y-2`}
              >
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Doctor Section */}
        <section className="py-16 px-8 text-center bg-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Are You a Doctor?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Join our network of certified healthcare professionals and connect with thousands of patients.
            Get your own dashboard, manage appointments, and grow your practice online.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {[
              ['📅', 'Manage Appointments', 'Easily view and handle patient bookings.'],
              ['💬', 'Real-Time Chat', 'Communicate instantly with patients securely.'],
              ['🧾', 'Upload & Review Reports', 'Access and review patient test results quickly.'],
            ].map(([icon, title, desc], index) => (
              <div
                key={index}
                className="bg-gray-100 p-6 rounded-xl shadow-md transform transition hover:-translate-y-2 hover:shadow-xl border border-gray-200"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <Link
            to="/doctor-register"
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            👨‍⚕️ Join as Doctor
          </Link>
        </section>

        {/* Stats / Why Us Extra Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
              Our <span className="text-purple-600">Impact</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                ['24/7', 'Access care anytime with our round-the-clock services.'],
                ['1M+', 'Trusted by over 1 million patients worldwide.'],
                ['500+', 'Partnered with over 500 top healthcare providers.'],
              ].map(([title, desc], index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-lg transform transition hover:-translate-y-2 hover:shadow-xl border border-blue-100"
                >
                  <h3 className="text-3xl font-bold text-purple-600 mb-2">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
