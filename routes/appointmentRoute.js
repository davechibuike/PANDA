const express = require("express");
const appointmentController = require("../controllers/appointmentController");
const router = express.Router();

router
  .route("/:patient")
  .get(appointmentController.getAppointmentsByPatient)
  .patch(appointmentController.updateAppointmentByPatient)
  .delete(appointmentController.deleteAppointmentByPatient);

router.put("/:id/update-status", appointmentController.updateAppointmentStatus);

router
  .route("/")
  .get(appointmentController.getAllAppointments)
  .post(appointmentController.createAppointments);

module.exports = router;
