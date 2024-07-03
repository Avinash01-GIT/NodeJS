const express = require("express");
const jokes = require("./data.js"); 
const app = express();

//Application Endpoint 
app.get("/jokes", (req, res) => {
  const randomJokeIndex = Math.floor(Math.random() * jokes.length);
  res.status(200).json({
    success: true,
    message: "Random Joke API",
    result: jokes[randomJokeIndex],
  });
});

// http://localhost:8080/jokes

//Application Endpoint to get a specific joke by ID
app.get("/jokes/:jokeId", (req, res) => {
  const jokeId = req.params.jokeId;
  const joke = jokes.find((j) => j.id === parseInt(jokeId));

  if (!joke) {
    return res.status(404).json({
      success: false,
      message: `No joke found with id ${jokeId}`,
    });
  }

  res.status(200).json({
    success: true,
    message: "Joke found by id",
    result: joke,
  });
});

// http://localhost:8080/jokes/7

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});



