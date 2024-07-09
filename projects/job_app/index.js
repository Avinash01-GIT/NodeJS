const express = require("express");
const mongoose = require("mongoose");
const jobRoutes = require("./route/job");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/job_app")
  .then(() => console.log("DB Connected successfully"))
  .catch((err) => console.log("Error connecting database", err));

app.use(express.json());
app.use(jobRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
