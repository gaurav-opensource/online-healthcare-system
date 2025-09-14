const express = require('express');
const router = express.Router();
const { createRating, getDoctorRatings } = require("../controllers/rating.controller");



router.post("/",  createRating); 
router.get("/doctor/:doctorId", getDoctorRatings);

module.exports = router;
