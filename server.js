// server
const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("./config/db");

// port
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//Connect To DB :-
// mongodb+srv://chibuikedaveuk:4tH4WZ4Z0y5mQz9F@natours.meodjwt.mongodb.net/
