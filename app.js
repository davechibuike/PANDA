const express = require("express");
const morgan = require("morgan");
const individualRouter = require("./routes/individualRoute");
const appointmentRouter = require("./routes/appointmentRoute");
const missedAppointmentRouter = require("./routes/missedAppointmentRoute");

const app = express();
app.use(express.json());

//middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ROUTES
app.use("/api/v1/individual", individualRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/missed-appointments", missedAppointmentRouter);

module.exports = app;
