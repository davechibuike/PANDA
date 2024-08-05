const express = require("express");
const router = express.Router();
const appiontmentController = require("../controllers/missedAppointmentController");

router.route("/").get(appiontmentController.missedAppointment);

module.exports = router;
