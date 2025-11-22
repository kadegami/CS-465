// app_api/controllers/trips.js
// Enhanced Controller for Milestone Four – Databases
// Author: Karina Washington
// Adds improved error handling, validation responses,
// and new getTripByCode API endpoint.

const mongoose = require("mongoose");
const Trip = mongoose.model("trips");

// GET all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find().exec();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({
      message: "Database error fetching trips",
      error: err.message,
    });
  }
};

// GET trip by code (new enhanced feature)
const tripsFindByCode = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const trip = await Trip.findByCode(tripCode);

    if (!trip) {
      return res.status(404).json({
        message: `Trip with code ${tripCode} not found`,
      });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching trip by code",
      error: err.message,
    });
  }
};

// POST create trip (includes validation support)
const tripsCreate = async (req, res) => {
  try {
    const newTrip = await Trip.create(req.body);
    return res.status(201).json(newTrip);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    }
    return res.status(500).json({
      message: "Error creating trip",
      error: err.message,
    });
  }
};

// PUT update trip
const tripsUpdate = async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    return res.status(200).json(updatedTrip);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    }
    return res.status(500).json({
      message: "Error updating trip",
      error: err.message,
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsCreate,
  tripsUpdate,
};
