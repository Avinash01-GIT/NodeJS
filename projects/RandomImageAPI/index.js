const express = require("express");
const app = express();
const randomImages = require("./data");

// Application EndPoints
app.get("/randomImage", (req, res) => {
  const random = Math.floor(Math.random() * randomImages.length);
  return res.status(200).json({
    success: true,
    message: "Random Image API",
    result: randomImages[random],
  });
});

app.get("/randomImage/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (!Number(id) || Number(id) > randomImages.length) {
    return res.status(200).json({
      status: false,
      message: "Invalid API",
    });
  }
  return res.status(200).json(randomImages.find((image) => image.id == id));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Express Server is up and running at port ${PORT}`);
});
