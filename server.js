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
