const mongoose = require("mongoose");
const Appointment = require("../models/appointmentModel");
const { getAllAppointments } = require("../controllers/appointmentController");

jest.mock("../models/appointmentModel.js");

describe("getAllAppointments", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all appointments", async () => {
    const mockAppointments = [
      {
        patient: "John Doe",
        status: "active",
        time: new Date(),
        duration: "30 minutes",
        department: "Cardiology",
        postcode: "12345",
      },
      {
        patient: "Jane Smith",
        status: "attended",
        time: new Date(),
        duration: "45 minutes",
        department: "Orthopedics",
        postcode: "67890",
      },
    ];

    Appointment.find.mockResolvedValue(mockAppointments);

    await getAllAppointments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      count: mockAppointments.length,
      data: mockAppointments,
    });
  });
});
