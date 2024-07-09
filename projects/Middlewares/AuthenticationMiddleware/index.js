const express = require("express");
const responseTime = require("response-time");
const morgan = require("morgan");
const app = express();

// Custom logger middleware
const logger = (req, res, next) => {
  console.log("Name: Gintoki Sakata");
  console.log("method:", req.method);
  console.log("url:", req.url);
  console.log("timestamp:", Date.now());
  console.log("response time:", res.get("X-Response-Time")); 
  console.log("ip =", req.socket.localAddress);
  console.log("URL=", req.url);

  next();
};

app.use(responseTime()); 
app.use(morgan("dev")); 
app.use(logger); 

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "request success",
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

