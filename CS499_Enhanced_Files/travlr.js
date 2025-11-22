// app_api/models/travlr.js
// Enhanced Trip Schema for CS-499 – Databases (Milestone Four)
// Author: Karina Washington
// Date: November 2025
// Description:
//   This file defines the MongoDB schema for travel "trips" in the Travlr Getaways
//   application. For the CS-499 Capstone, the schema was enhanced to include
//   stronger validation rules, field constraints, and an index on the trip code
//   to improve data quality and query performance.

const mongoose = require('mongoose');

// Trip schema definition with validation and constraints
const tripSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Trip code is required'],
      unique: true,
      uppercase: true,
      trim: true,
      minlength: [3, 'Trip code must be at least 3 characters long']
      // Example format: "BCN001", "MXC123"
    },

    name: {
      type: String,
      required: [true, 'Trip name is required'],
      trim: true,
      minlength: [3, 'Trip name must be at least 3 characters long'],
      maxlength: [100, 'Trip name must be at most 100 characters long']
    },

    length: {
      // number of days
      type: Number,
      required: [true, 'Trip length is required'],
      min: [1, 'Trip length must be at least 1 day'],
      max: [60, 'Trip length must be at most 60 days']
    },

    start: {
      type: Date,
      required: [true, 'Start date is required']
    },

    resort: {
      type: String,
      required: [true, 'Resort name is required'],
      trim: true,
      minlength: [2, 'Resort name must be at least 2 characters long']
    },

    perPerson: {
      type: Number,
      required: [true, 'Per-person price is required'],
      min: [0, 'Price per person cannot be negative']
    },

    image: {
      type: String,
      trim: true
      // Optional: could add a regex to validate file type or URL format
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long'],
      maxlength: [2000, 'Description must be at most 2000 characters long']
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'trips'
  }
);

// Index on code to enforce uniqueness and speed lookups
tripSchema.index({ code: 1 }, { unique: true });

// Optional helper method: find by trip code
tripSchema.statics.findByCode = function (tripCode) {
  return this.findOne({ code: tripCode.toUpperCase() }).exec();
};

// Register the model with Mongoose
mongoose.model('trips', tripSchema);

// Export the model for direct import, if needed in controllers
module.exports = mongoose.model('trips');