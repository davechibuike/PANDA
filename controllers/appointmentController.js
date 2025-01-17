const formatName = require("../utils/formatName");
const Appointment = require("../models/appointmentModel");

exports.createAppointments = async (req, res) => {
  try {
    const { patient, status, time, duration, clinician, department, postcode } =
      req.body;

    const formattedClinician = formatName(clinician);

    const newAppointment = new Appointment({
      patient,
      status,
      time,
      duration,
      clinician: formattedClinician,
      department,
      postcode,
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({
      status: "success",
      data: savedAppointment,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({
        status: "fail",
        message:
          "Duplicate appointment: An appointment already exists for this patient at the specified time.",
      });
    } else {
      res.status(500).json({
        status: "fail",
        message: "Server Error",
      });
    }
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({
      status: "success",
      count: appointments.length,
      data: appointments,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

exports.getAppointmentsByPatient = async (req, res) => {
  try {
    const { patient } = req.params;

    const appointments = await Appointment.find({ patient });

    if (appointments.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No appointments found for the specified patient",
      });
    }

    res.status(200).json({
      status: "success",
      count: appointments.length,
      data: appointments,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

exports.updateAppointmentByPatient = async (req, res) => {
  try {
    const { patient } = req.params;
    const updateData = req.body;

    const appointment = await Appointment.findOneAndUpdate(
      { patient },
      updateData,
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Appointment not found for the specified patient",
      });
    }

    res.status(200).json({
      status: "success",
      data: appointment,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

exports.deleteAppointmentByPatient = async (req, res) => {
  try {
    const { patient } = req.params;

    const appointment = await Appointment.findOneAndDelete({ patient });

    if (!appointment) {
      return res.status(404).json({
        status: "fail",
        message: "Appointment not found for the specified patient",
      });
    }

    res.status(200).json({
      status: "success",
      data: appointment,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Find the appointment by ID
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Check if the current status is "cancelled"
    if (appointment.status === "cancelled") {
      return res.status(400).json({ error: "Status cannot be reinstated" });
    }

    // Update the status
    appointment.status = status;
    await appointment.save();

    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
