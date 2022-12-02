const mongoose = require('mongoose');
const gateSchema = new mongoose.Schema({
  gateNo: {
    type: String,
    required: true,
  },
  gateEnabled: {
    type: Boolean,
    default: true,
  },
  terminal: {
    type: String,
    required: true,
  },
  to: {
    type: Date,
    required: false,
  },
  from: {
    type: Date,
    required: false,
  },
  flight: {
    type:String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Flight",
    default: null,
  }

});


module.exports = mongoose.model('Gate', gateSchema);
