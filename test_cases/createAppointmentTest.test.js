const mongoose = require("mongoose");
const { createAppointments } = require("../controllers/appointmentController");
const Appointment = require("../models/appointmentModel");

jest.mock("../models/appointmentModel.js");

describe("createAppointments handler", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        patient: "John Doe",
        status: "active",
        time: new Date(),
        duration: "30 minutes",
        clinician: "Dr. Smith",
        department: "Cardiology",
        postcode: "12345",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new appointment successfully", async () => {
    Appointment.mockImplementationOnce(() => ({
      save: jest.fn().mockResolvedValue({
        _id: "mocked_id",
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    }));

    await createAppointments(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: expect.objectContaining({
        _id: "mocked_id",
        patient: req.body.patient,
        status: req.body.status,
        time: expect.any(Date),
        duration: req.body.duration,
        clinician: req.body.clinician,
        department: req.body.department,
        postcode: req.body.postcode,
      }),
    });
  });

  it("should handle duplicate appointment error (code 11000)", async () => {
    const mockError = { code: 11000 };
    Appointment.mockImplementationOnce(() => ({
      save: jest.fn().mockRejectedValue(mockError),
    }));

    await createAppointments(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message:
        "Duplicate appointment: An appointment already exists for this patient at the specified time.",
    });
  });

  it("should handle generic server errors", async () => {
    const mockError = new Error("Mocked server error");
    Appointment.mockImplementationOnce(() => ({
      save: jest.fn().mockRejectedValue(mockError),
    }));

    await createAppointments(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Server Error",
    });
  });
});
