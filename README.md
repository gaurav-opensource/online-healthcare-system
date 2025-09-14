# Online Healthcare System

I developed a full-stack healthcare platform that enables smart doctor-patient interaction.
Users can search doctors, book appointments, make secure payments, and upload reports.
I implemented role-based access for Admin, Doctor, and User, along with profile management.
For communication, I integrated video calls using WebRTC and real-time chat using Socket.IO.
Media files like reports and profile photos are stored on Cloudinary for scalability and performance

---

## Table of Contents

- [About the Project](#about-the-project)  
- [Features](#features)  
- [Technology Stack](#technology-stack)  
- [Getting Started](#getting-started)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Project Flow](#project-flow)  
  - [Patient Flow](#patient-flow)  
  - [Doctor Flow](#doctor-flow)  
  - [Admin Flow](#admin-flow)  
- [Future Improvements](#future-improvements)  
- [License](#license)  
- [Contact](#contact)  

---

## About the Project

This project is a full-stack online healthcare system designed to bridge the gap between patients and doctors through a user-friendly and secure platform. The application provides end-to-end functionality, from user registration and doctor search to virtual consultations, secure file sharing, and prescription management. It aims to streamline the appointment process and provide a reliable telehealth solution.

---

## Features

- **User Roles:** Separate portals for Patients, Doctors, and Admin.  
- **Doctor Search & Discovery:** Patients can search for doctors based on specialization, location, and fees.  
- **Profile Management:** Detailed profiles for doctors, including qualifications, ratings, and availability.  
- **Secure Admin Panel:** Admins can verify and approve new doctors by checking their licenses and certificates, ensuring credibility.  
- **Appointment Booking:** Patients can schedule appointments with a detailed explanation of their condition, date, and time.  
- **Video Consultation:** Integrated real-time video call functionality powered by Socket.io for virtual appointments.  
- **Real-time Chat:** A live chat system available during video consultations.  
- **Secure File Uploads:** Patients can upload medical reports and images to a dedicated folder for the doctor using Cloudinary.  
- **Prescription Management:** Doctors can send digital prescriptions to patients after a consultation.  
- **Rating & Feedback:** Patients can rate and leave comments for doctors after an appointment.  
- **Appointment Status Management:** Doctors can track pending, completed, and upcoming appointments.  
- **Payment Integration:** The initial implementation uses a basic model, with plans for integration of Razorpay for secure payments.

---

## Technology Stack

- **Frontend:**  
  - React  
  - Tailwind CSS  

- **Backend:**  
  - Node.js & Express.js  
  - MongoDB  
  - Mongoose  

- **Key Tools & Libraries:**  
  - Socket.io (for video calls & chat)  
  - Cloudinary (for file storage)  
  - JWT (for authentication)  
  - Bcrypt (for password hashing)  
  - Nodemon (for development)  

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher) and npm  
- MongoDB database (local or cloud)  
- Git client  
- Cloudinary account for file uploads  

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gaurav-opensource/online-healthcare-system.git
   cd online-healthcare-system
2. Setup Backend:

```bash
cd backend
npm install
```
Create a .env file in the backend directory with:




```
MONGO_URI=mongodb://127.0.0.1:27017/online-healthcare
PORT=5000
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
-Start the backend server:



```
npm start
Setup Frontend:
```
Open a new terminal window:

```
cd frontend
npm install
```
Create a .env file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```
Start the frontend server:

```
npm start

```
# Project Flow

## Patient Flow
- Register and create account
- Search doctors by filters (specialization, fees, location)
- View detailed doctor profiles with ratings
- Book appointments by selecting date, time, and describing symptoms
- Make payments (model-based currently)
- Join video calls with doctors at appointment time
- Upload test reports via Cloudinary
- Rate and comment on doctors post consultation
- Receive digital prescriptions

## Doctor Flow
- Register and submit profile with credentials
- Get admin approval
- Manage appointments (pending, upcoming, completed)
- Receive notifications for video calls
- Conduct video consultations with chat
- Send prescriptions after consultation

## Admin Flow
- Verify doctor licenses and certificates
- Approve or reject doctor profiles
- Manage users and monitor platform activity

## Future Improvements
- Razorpay payment gateway integration
- Advanced doctor search filters
- Email and SMS notifications for appointments
- Enhanced dashboards with analytics
- UI/UX improvements for better experience

## License
This project is licensed under the ISC License.

## Contact
For questions or feedback, open an issue or contact:

**Gaurav**  

