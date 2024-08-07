const express = require("express"); //express app
const router = express.Router();

//this is where we import the controllers we will router
const tripsController = require("../controllers/trips");

//define route for our trips endpoint
router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

//define route for our trips endpoint
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip);

module.exports = router;
