const mongoose = require("mongoose");

const individualSchema = new mongoose.Schema({
  nhs_number: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
});

const Individual = mongoose.model("Individual", individualSchema);

module.exports = Individual;
