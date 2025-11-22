// app_api/routes/index.js
// Enhanced API Routes for CS499 – Databases
// Author: Karina Washington

const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

// GET list of all trips
router.get("/trips", tripsController.tripsList);

// NEW — find trip by code (uses enhanced schema and controller)
router.get("/trips/:tripCode", tripsController.tripsFindByCode);

// Create a new trip
router.post("/trips", tripsController.tripsCreate);

// Update a trip by code
router.put("/trips/:tripCode", tripsController.tripsUpdate);

module.exports = router;
