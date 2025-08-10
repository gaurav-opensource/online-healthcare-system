const express = require("express");
const cors = require("cors");
require('dotenv').config();
const logger = require('./utils/logger'); 

// ✅ Routes
const AdminRoute = require('./routes/admin.routes');
const UserRoute = require('./routes/users.routes');
const DoctorRoute = require('./routes/doctors.routes');
const AppoinmentRoute = require('./routes/appointment.route');
const PaymentRoute = require('./routes/payments.routes');
const RatingRoute = require('./routes/ratings.routes');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(() => {
  logger.info('Database connected successfully');
}).catch((err) => {
  logger.error('Database connection failed:', err.message);
});
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

app.use('/api/admin', AdminRoute);
app.use('/api/users', UserRoute);
app.use('/api/doctors', DoctorRoute);
app.use('/api/appointments', AppoinmentRoute);
app.use('/api/payment', PaymentRoute);
app.use('/api/ratings', RatingRoute);

//Optional: Log incoming requests (middleware)
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(`${err.message}`);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
