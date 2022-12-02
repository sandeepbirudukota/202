//const connection = require("../config/db")
const express = require('express');

const { UserAuth } = require('../services/auth.js');
const router = express.Router();


router.get('/get', async (req, res) => {
  const data = req.query;
  const response = {};
  try {
    const result = await UserAuth.loginUser(data);
    console.log("in login")
    if (result) {
      response.success = true;
      response.user = result;
      response.status = '200';
      res.status(200).send(response);
    } else {
      response.success = false;
      response.error = 'Incorrect Username or Password';
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
