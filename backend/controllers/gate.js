const express = require('express');

const gate = require('../model/gate');
const { response } = require('../index.js');
const { Gate } = require('../services/gate');

const router = express.Router();

router.get('/getGateDetails', async (req, res) => {
  const response = {};
  try {
    const result = await Gate.getGateDetails();

    if (result) {
      response.success = true;
      response.gates = result;
      response.status = '200';
      res.status(200).send(response);
    } else {
      response.success = false;
      response.error = 'No Gates found';
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
