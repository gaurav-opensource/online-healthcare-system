
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import PublicLayout from "./layouts/PublicLayout";



import SignupPage from "./pages/SignupPage";

// User pages
import UserHome from "./pages/user/Home";
import UserProfilePage from "./pages/user/UserProfile";
import DoctorListPage from "./pages/user/DoctorList";
import AppointmentForm from "./pages/user/Apponinment";
import PaymentPage from "./pages/user/PaymentPage";


// Doctor pages
import DoctorHome from "./pages/doctor/Home";
import DoctorProfilePage from "./pages/doctor/DoctorProfile";

// Admin pages
import AdminHome from "./pages/admin/Home";
import AdminProfilePage from "./pages/admin/adminProfile";
import VideoMeetComponent from "./socket/VidoesCall";

import DoctorRatingPage from "./pages/doctor/DoctorRating";


import EditProfile from "./pages/doctor/EditProfile";
import ServicePage from "./components/ServicePage";
import AboutPage from "./components/AboutPage";
import RateDoctor from "./pages/user/DoctorRating";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import UserDashboardPage from "./pages/user/UserDashboard";
import DoctorProfile from "./pages/user/DoctorProfile";
import DoctorDashboardPage from "./pages/doctor/DoctorDashboard";
import AddDoctorCard from "./pages/doctor/AddCard";
import TestEmailPage from "./pages/SendEmail";



function App() {
  return (
    <Routes>
      {/* Public layout for login/signup */}
      <Route element={<PublicLayout />}>
       <Route path="/" element={<HomePage/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
       <Route path="/video-call/:appoinmentId" element={<VideoMeetComponent />} />
      

      </Route>

      {/* Main layout for authenticated pages */}
      <Route element={<MainLayout />}>
        {/* User routes */}
        
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/doctorlist" element={<DoctorListPage />} />
        <Route path="/book-appointment/:doctorId" element={<AppointmentForm />} />
        <Route path="/rating/:appointmentId" element={<RateDoctor />} />
         <Route path="/user/dashboard" element={<UserDashboardPage />} />
          <Route path="/user/doctorprofile/:doctorId" element={<DoctorProfile/>} />

        
        <Route path="/service" element={<ServicePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/user/payment" element={<PaymentPage />} />

        {/* Doctor routes */}
        <Route path="/doctor/home" element={<DoctorHome />} />
        <Route path="/doctor/send" element={<TestEmailPage/>} />
        <Route path="/doctor/add-card" element={<AddDoctorCard />} />
        <Route path="/doctor/profile" element={<DoctorProfilePage />} />
        <Route path="/rate/:appointmentId/:doctorId" element={<DoctorRatingPage/>} />
        <Route path="/doctor/edit-profile" element={<EditProfile/>} />
        <Route path="/doctor/dashboard" element={<DoctorDashboardPage/>} />
        

        {/* Admin routes */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />

        {/* Vidoes call Route */}
        
      </Route>
    </Routes>
  );
}

export default App;
