const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "attended", "missed", "cancelled"],
      default: "active",
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    clinician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinician", // reference to the Clinician model
      required: true,
    },
    clinician: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

appointmentSchema.index({ patient: 1, time: 1 }, { unique: true });
const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
