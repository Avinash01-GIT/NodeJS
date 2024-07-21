const express = require("express");
const mongoose = require("mongoose");
const fileRoute = require("./routes/fileroute");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/SHAREit")
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log("Error connecting Database", err));

app.use(express.json());

app.use(fileRoute);

app.listen("5000", () => {
  console.log("server is running on port 5000");
});
