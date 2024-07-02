const express = require("express");

const cartRoutes = require("./cartApi");
const productRoutes = require("./productApi");
const userRoutes = require("./userApi");

// Server Initialization
const app = express();

const errorHandler = (err, req, res, next) => {
  console.log("ERROR OCCURED IN SYSTEM");
  // save the error in a file using fs module
  res.status(500).json({
    success: false,
    message: "Something went wrong, please try again after sometime",
  });
};

//API Endpoints
app.use(cartRoutes);
app.use(productRoutes);
app.use(userRoutes);

app.use(errorHandler);

app.listen(10000, () => {
  console.log(`Express Server is up and running at port 10000`);
});
