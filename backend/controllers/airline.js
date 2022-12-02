const express = require('express');

const { Airline } = require('../services/airline.js');

const router = express.Router();

router.get('/get', async (req, res) => {
  const { type, hour } = req.query;
  const response = {};
  try {
    const result = await Airline.getFlightDetails(type, hour);
    if (result && result.length > 0) {

      res.status(200).send(result);
    } else {
      response.success = false;
      response.error = 'No flights found';
      response.status = '400';
      res.status(400).send(response);
    }
  } catch (e) {
    console.log(e);
    response.success = false;
    response.error = 'Some error occurred. Please try again later';
    response.status = '500';
    res.status(500).send(response);
  }
});

router.post('/add', async (req, res) => {
  //   const result = {};
  const response = {};
 
  try {
    const data = req.body;
    const result = await Airline.addFlight(data);
    if (result) {
      response.success = true;
      response.flights = result;
      response.status = '200';
      res.status(200).send(response);
    } else {
      response.success = false;
      response.error = 'Flight Not Added';
      response.status = '400';
      res.status(400).send(response);
    }
  } catch (e) {
    console.log(e);
    response.success = false;
    response.error =
      'Error occurred while Adding Flight. Please try again later';
    response.status = '500';
    res.status(500).send(response);
  }
});

router.put('/update', async (req, res) => {
  const response = {};
  
  try {
    const data = req.body;
    const result = await Airline.updateFlight(data);
    if (result) {
      response.success = true;
      response.flights = result;
      response.status = '200';
      res.status(200).send(response);
    } else {
      response.success = false;
      response.error = 'Flight Not Updated';
      response.status = '400';
      res.status(400).send(response);
    }
  } catch (e) {
    console.log(e);
    response.success = false;
    response.error =
      'Error occurred while Updating Flight. Please try again later';
    response.status = '500';
    res.status(500).send(response);
  }
});


router.get('/getByName', async (req, res) => {
  const { name } = req.query;
  const response = {};
  try {
    const result = await Airline.getFlightDetailsForAirline(name);
    if (result) {
      res.status(200).send(result);
    } else {
      response.success = false;
      response.error = 'No flights found';
      response.status = '400';
      res.status(400).send(response);
    }
  } catch (e) {
    console.log(e);
    response.success = false;
    response.error = 'Some error occurred. Please try again later';
    response.status = '500';
    res.status(500).send(response);
  }
});


module.exports = router;
