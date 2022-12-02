const gate = require("../model/gate");
const Flight = require("../model/flight");
const BaggageCarousel = require("../model/baggageCarousel");
const mongoose = require("mongoose");

class Airport {
  static gateMaintenance = async (data) => {
    try {
      let query = {
        gateNo: data?.gate,
        terminal: data?.terminal,
      };

      let foundGate = await gate.findOneAndUpdate(query, {
        gateEnabled: data.type,
      });
      foundGate.gateEnabled = data.type;
      return foundGate;
    }
    catch (err) {
      console.log(err);
      console.log("Some unexpected error occured while fetching gate details");
    }
  };

  static addCarousel = async (data) => {
    try {
      let flight = await Flight.findOne({ flightNo: data?.flightNo, gateNo: mongoose.Types.ObjectId(data?.gateNo) });
      let bagCarousel = await BaggageCarousel.findOneAndUpdate({ assigned: false }, { assigned: true });
      console.log(bagCarousel)
      console.log("ssss")

      if (flight && flight.gateNo != null && bagCarousel) {
        flight.baggageCarousel = bagCarousel.terminal + "" + bagCarousel.carouselNo;
        flight.save();
        return flight;
      }
    } catch (err) {
      console.log(err);
      console.log(
        "Some unexpected error occured while adding carousel"
      );
    }
  };
}

module.exports.Airport = Airport;
