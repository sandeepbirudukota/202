const mongoose = require("mongoose");
const baggageCarouselSchema = new mongoose.Schema(
  {
    carouselNo: {
      type: String,
      required: true,
    },
    assigned: {
      type: Boolean,
      default: false,
      required: true,
    },
    terminal: {
      type: String,
      default: 'B',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BaggageCarousel", baggageCarouselSchema);
