const express = require("express");
const mongoose = require("mongoose");
const jobRoutes = require("./route/job");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL) 
  .then(() => console.log("DB Connected successfully"))
  .catch((err) => console.log("Error connecting database", err));

app.use(express.json());
app.use(jobRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
