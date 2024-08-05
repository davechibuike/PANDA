const cron = require("node-cron");

const Appointment = require("./appointmentModel");

// Function to update missed appointments
async function updateMissedAppointments() {
  const now = new Date();
  const missedAppointments = await Appointment.find({
    status: "active",
    time: { $lte: now },
  });

  for (const appointment of missedAppointments) {
    appointment.status = "missed";
    await appointment.save();
  }
}

// Schedule the job to run every 30 mins
cron.schedule("*/30 * * * *", updateMissedAppointments);
