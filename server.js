// server
const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

// env config
dotenv.config({ path: "./config.env" });

// db connection
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection successfyl!");
  });

// port
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//Connect To DB :-
// mongodb+srv://chibuikedaveuk:4tH4WZ4Z0y5mQz9F@natours.meodjwt.mongodb.net/
