require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var moment = require('moment');

// controllers
const authenticatectrl = require('./controllers/authctrl');
const airline = require('./controllers/airline');
const airport = require('./controllers/airport');

const airlineauth = require('./controllers/airlineAuth');
const gates = require('./controllers/gate');
const { Airline } = require('./services/airline.js');
const flight = require('./model/flight');
const gate = require('./model/gate');

// const data = require('./flight');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const responseTime = require('response-time');
const redis = require('redis');
const axios = require('axios');
const cron = require('node-cron');
const InitiateMongoServer = require('./config/mongo/mongodb');
InitiateMongoServer();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(responseTime());

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, Date.now() + '-' + file.originalname);
  },
});

cron.schedule('*/2 * * * *', async function () {
  console.log(
    'scheduler running ' + moment().toISOString() + ' ' + moment().format('lll')
  );

  Airline.randomGateAssignment();
  Airline.randomGateDeallocate();
});
var upload = multer({ storage: storage });
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authenticatectrl);

app.use('/api/airline', airline);
app.use('/api/airport', airport);
app.use('/api/airline/auth', airlineauth);
// app.use('./api/airline/gates', gates);
app.use('/api/gates', gates);

// server listening
app.listen(process.env.PORT || 3001, function () {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env
  );
});
module.exports = app;
