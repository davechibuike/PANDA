const Appointment = require("../models/appointmentModel");

exports.getAllPastAppointments = async (req, res) => {
  const { clinician, department } = req.body;
  try {
    const now = new Date();
    const pastAppointments = await Appointment.find({
      time: { $lt: now },
      $or: [{ clinician: clinician }, { department: department }],
    });
    res.status(200).json({
      status: "success",
      data: pastAppointments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};
