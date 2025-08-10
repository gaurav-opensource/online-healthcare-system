


const express = require('express');
const router = express.Router();
const { createRating, getDoctorRatings } = require("../controllers/rating.controller");


// Admin routes
router.post("/",  createRating); // POST /api/ratings
router.get("/doctor/:doctorId", getDoctorRatings);

module.exports = router;
