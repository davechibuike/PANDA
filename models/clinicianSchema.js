const mongoose = require("mongoose");

const clinicianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Clinician = mongoose.model("Clinician", clinicianSchema);

module.exports = Clinician;
