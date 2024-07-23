const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connected successfully"))
  .catch((err) => console.error("Error connecting database", err));

app.listen(10000, () => {
  console.log("Server is running on port 10000");
});
