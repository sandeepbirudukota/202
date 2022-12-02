const express = require("express");

const { Airport } = require("../services/airport");

const router = express.Router();

router.post("/gateMaintenance", async (req, res) => {
  const response = {};
  try {
    const data = req.body;
    const result = await Airport.gateMaintenance(data);
    if (result) {
      response.success = true;
      response.gate = result;
      response.status = "200";
      res.status(200).send(response);
    } else {
      response.success = false;
      response.error =
        "A flight is already assigned to this Gate. Please try after sometime";
      response.status = "400";
      res.status(400).send(response);
    }
  } catch (e) {
    console.log(e);
    response.success = false;
    response.error = "Some error occurred. Please try again later";
    response.status = "500";
    res.status(500).send(response);
  }
});

router.post("/setCarousel", async (req, res) => {
  const flight = req.body;
  const response = {};
  try {
    const result = await Airport.addCarousel(flight);
    if (result) {
      res.status(200).send(result);
    } else {
      response.success = false;
      response.error = "Carousel not available";
      response.status = "400";
      res.status(400).send(response);
    }
  } catch (e) {
    console.log(e);
    response.success = false;
    response.error = "Some error occurred. Please try again later";
    response.status = "500";
    res.status(500).send(response);
  }
});

module.exports = router;
