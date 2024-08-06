const cron = require("node-cron");
const Appointment = require("../models/appointmentModel");
const mongoose = require("../config/db");

const updateMissedAppointments = async () => {
  try {
    const now = new Date();
    console.log("Current time:", now);

    // Find appointments that are past and not attended
    const pastAppointments = await Appointment.find({
      time: { $lt: now },
      status: { $ne: "attended" },
    });

    if (pastAppointments.length > 0) {
      console.log(`Found ${pastAppointments.length} past appointments`);

      // Update the status to 'missed'
      const result = await Appointment.updateMany(
        { appointmentTime: { $lt: now }, status: { $ne: "attended" } },
        { $set: { status: "missed" } }
      );
    } else {
      console.log("No appointments are in the past.");
    }
  } catch (error) {
    console.error("Error updating missed appointments:", error);
  }
};

// Schedule the cron job to run every second
cron.schedule("* * * * * *", () => {
  console.log("Running cron job to update missed appointments");
  updateMissedAppointments();
});

// Prevent the script from exiting immediately
process.stdin.resume();
