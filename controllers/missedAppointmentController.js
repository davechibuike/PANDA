const Appointment = require("../models/appointmentModel");

exports.missedAppointment = async (req, res) => {
  try {
    const { clinician, department, startDate, endDate } = req.query;

    const match = {};
    if (clinician) {
      match.clinician = clinician;
    }
    if (department) {
      match.department = department;
    }
    if (startDate && endDate) {
      match.time = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const pipeline = [
      {
        $match: match,
      },
      {
        $match: { status: "missed" },
      },
      {
        $group: {
          _id: { clinician: "$clinician", department: "$department" },
          missedAppointments: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "clinicians",
          localField: "_id.clinician",
          foreignField: "_id",
          as: "clinician",
        },
      },
      {
        $unwind: "$clinician",
      },
      {
        $project: {
          clinician: "$clinician.name",
          department: "$_id.department",
          missedAppointments: 1,
        },
      },
    ];

    const results = await Appointment.aggregate(pipeline);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving missed appointments" });
  }
};
