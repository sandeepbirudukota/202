const mongoose = require('mongoose');
const flightSchema = new mongoose.Schema(
  {
    // airline_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"airline"
    // },
    // airlineName: String,
    airlineName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    flightNo: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    departureTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "NEW",
      required: true,
    },
    gateNo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gate",
    },
    baggageCarousel: {
      type: String,
      default: null,
      required: false,
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model('Flight', flightSchema);
