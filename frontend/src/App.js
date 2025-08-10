import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import PublicLayout from "./layouts/PublicLayout";

// Public pages (no Navbar/Footer)

import SignupPage from "./auth/signup";

// User pages
import UserHome from "./pages/user/Home";
import UserProfilePage from "./pages/user/userProfile";
import DoctorListPage from "./pages/user/DoctorListPage";
import AppointmentForm from "./pages/user/Apponinment";
import PaymentPage from "./pages/user/PaymentPage";

// Doctor pages
import DoctorHome from "./pages/doctor/Home";
import DoctorProfilePage from "./pages/doctor/doctorProfile";

// Admin pages
import AdminHome from "./pages/admin/Home";
import AdminProfilePage from "./pages/admin/adminProfile";
import VideoMeetComponent from "./socket/VidoesCall";

import DoctorRatingPage from "./pages/doctor/DoctorRating";
import PendingAppoinment from "./pages/doctor/PendingAppoinment";

import CompeteAppoinment from "./pages/doctor/CompeteAppoinment";
import EditProfile from "./pages/doctor/EditProfile";
import ServicePage from "./components/ServicePage";
import AboutPage from "./components/AboutPage";
import RateDoctor from "./pages/user/Rating";
import TestUpload from "./auth/test";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <Routes>
      {/* Public layout for login/signup */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/test" element={< TestUpload/>} />
       <Route path="/video-call/:appoinmentId" element={<VideoMeetComponent />} />
      

      </Route>

      {/* Main layout for authenticated pages */}
      <Route element={<MainLayout />}>
        {/* User routes */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/doctorlist" element={<DoctorListPage />} />
        <Route path="/doctorlist/user/book-appointment/:doctorId" element={<AppointmentForm />} />
        <Route path="/rating/:appointmentId" element={<RateDoctor />} />

        
         <Route path="/service" element={<ServicePage/>}/>
         <Route path="/about" element={<AboutPage/>}/>
        <Route path="/user/payment" element={<PaymentPage />} />

        {/* Doctor routes */}
        <Route path="/doctor/home" element={<DoctorHome />} />
        <Route path="/doctor/profile" element={<DoctorProfilePage />} />
        <Route path="/rate/:appointmentId/:doctorId" element={<DoctorRatingPage/>} />
        <Route path="/pending/doctor" element={<PendingAppoinment />} />
        <Route path="/compete/doctor" element={<CompeteAppoinment />} />
        <Route path="/doctor/edit-profile" element={<EditProfile/>} />
        

        {/* Admin routes */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/profile" element={<AdminProfilePage />} />

        {/* Vidoes call Route */}
        
      </Route>
    </Routes>
  );
}

export default App;
